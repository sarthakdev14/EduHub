import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Load data
data = pd.read_csv('cutoff_data.csv')

# Preprocess data
X = data[['Applicants', 'ExamDifficulty', 'SeatAvailability', 'CoursePopularity']]
y = data['Cutoff']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse}")

# Example usage for predicting a new cutoff
new_data = pd.DataFrame({
    'Applicants': [10000],
    'ExamDifficulty': [0.7],
    'SeatAvailability': [500],
    'CoursePopularity': [0.8]
})

predicted_cutoff = model.predict(new_data)
print(f"Predicted Cutoff: {predicted_cutoff[0]}")
