from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("iris_model.pkl")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    try:

        sepal_length = float(request.form["sepal_length"])
        sepal_width = float(request.form["sepal_width"])
        petal_length = float(request.form["petal_length"])
        petal_width = float(request.form["petal_width"])

        features = np.array([
            [
                sepal_length,
                sepal_width,
                petal_length,
                petal_width
            ]
        ])

        prediction = int(model.predict(features)[0])

        flower_names = {
            0: "Iris-setosa",
            1: "Iris-versicolor",
            2: "Iris-virginica"
        }

        prediction = flower_names[prediction]

        confidence = float(model.predict_proba(features).max() * 100)
        return jsonify({
            "prediction": prediction,
            "confidence": round(confidence, 2)
        })


    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 400


if __name__ == "__main__":
    app.run(debug=True)