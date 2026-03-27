from flask import Flask, request, jsonify
from flask_cors import CORS
from aco import ACO
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.json
    farms = data['farms'] # [{x, y, demand}]
    capacity = int(data['capacity'])

    coords = np.array([[f['x'], f['y']] for f in farms])
    demands = [f['demand'] for f in farms]
    
    # Calculate Euclidean distance matrix
    dist_matrix = np.linalg.norm(coords[:, np.newaxis] - coords, axis=2)
    
    aco = ACO(dist_matrix, demands, capacity)
    best_path, best_dist = aco.run()
    
    return jsonify({
        "path": best_path,
        "total_distance": round(best_dist, 2)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)