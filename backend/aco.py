import numpy as np
import random

class ACO:
    def __init__(self, distances, demands, capacity, n_ants=20, n_iterations=100, alpha=1.0, beta=2.0, rho=0.1):
        self.distances = distances
        self.demands = demands
        self.capacity = capacity
        self.n_ants = n_ants
        self.n_iterations = n_iterations
        self.alpha = alpha 
        self.beta = beta    
        self.rho = rho      
        self.n_nodes = len(distances)
        # Initialize pheromones
        self.pheromone = np.ones((self.n_nodes, self.n_nodes)) * 0.1

    def run(self):
        best_path = None
        best_dist = float('inf')

        for _ in range(self.n_iterations):
            all_paths = self._construct_solutions()
            self._update_pheromones(all_paths)
            
            for path, dist in all_paths:
                if dist < best_dist:
                    best_dist = dist
                    best_path = path
        return best_path, best_dist

    def _construct_solutions(self):
        solutions = []
        for _ in range(self.n_ants):
            path = [0] 
            current_load = 0
            visited = {0}
            total_dist = 0
            
            while len(visited) < self.n_nodes:
                curr = path[-1]
                # Filter nodes that haven't been visited AND fit in the truck
                feasible_nodes = []
                for i in range(1, self.n_nodes):
                    if i not in visited and (current_load + self.demands[i] <= self.capacity):
                        feasible_nodes.append(i)
                
                if not feasible_nodes:
                    # TRUCK FULL or NO REACHABLE FARMS: Return to Depot to refill
                    total_dist += self.distances[curr][0]
                    path.append(0)
                    current_load = 0 # Refilled at Depot
                    continue 
                
                # Choose next node based on ACO probability formula
                next_node = self._select_next(curr, feasible_nodes)
                total_dist += self.distances[curr][next_node]
                current_load += self.demands[next_node]
                path.append(next_node)
                visited.add(next_node)
            
            # Finally, return to Depot from the last farm
            total_dist += self.distances[path[-1]][0]
            path.append(0)
            solutions.append((path, total_dist))
        return solutions

    def _select_next(self, curr, feasible_nodes):
        # The core ACO Math: P = (pheromone^alpha) * (heuristic^beta)
        probs = []
        for node in feasible_nodes:
            eta = 1.0 / (self.distances[curr][node] + 1e-10) # Heuristic (closeness)
            tau = self.pheromone[curr][node]                # Pheromone trail
            probs.append((tau ** self.alpha) * (eta ** self.beta))
        
        sum_probs = sum(probs)
        norm_probs = [p / sum_probs for p in probs]
        return random.choices(feasible_nodes, weights=norm_probs)[0]

    def _update_pheromones(self, all_paths):
        # 1. Evaporation
        self.pheromone *= (1 - self.rho)
        # 2. Deposit (Ant-Cycle Model)
        for path, dist in all_paths:
            contribution = 1.0 / dist
            for i in range(len(path) - 1):
                u, v = path[i], path[i+1]
                self.pheromone[u][v] += contribution