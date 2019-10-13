# Part 1 - Data Preprocessing

# Importing the libraries
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import confusion_matrix
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import Adam
from keras.wrappers.scikit_learn import KerasClassifier

# Import the dataset
dataset = pd.read_csv('Churn_Modelling.csv')
X = dataset.iloc[:, 3:-1].values
y = dataset.iloc[:, -1].values

# Encoding categorical data
X[:, 1] = LabelEncoder().fit_transform(X[:, 1])
X[:, 2] = LabelEncoder().fit_transform(X[:, 2])
X = ColumnTransformer(transformers=[('Geography', OneHotEncoder(categories='auto'), [1])], remainder='passthrough').fit_transform(X).astype('float64')
X = X[:, 1:]

# Splitting the dataset into the Training set and Test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

# Feature scaling
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

# Part 2 - Let's make the ANN

# Initialize the ANN
classifier = Sequential()

# Add the input layer and the first hidden layer with Dropout
classifier.add(Dense(units = 6, kernel_initializer = 'random_uniform', activation = 'relu', input_shape=(11,)))
classifier.add(Dropout(p = 0.1))

# Adding a second hidden layer
classifier.add(Dense(units = 6, kernel_initializer = 'random_uniform', activation = 'relu'))
classifier.add(Dropout(p = 0.1))

# Adding the output layer
classifier.add(Dense(units = 1, kernel_initializer = 'random_uniform', activation = 'sigmoid'))

# Compile the ANN
classifier.compile(optimizer = Adam(lr = 0.001, decay = 1e-6), loss = 'binary_crossentropy', metrics = ['accuracy'])

# Fitting the ANN to the Training set
classifier.fit(X_train, y_train, batch_size = 10, epochs = 100)

# Part 3 - Make the predictions and evaluate the model

# Predicting the Test set results
y_pred = classifier.predict(X_test)
y_pred = (y_pred > 0.5)

# Predict new observation
new_prediction = classifier.predict(sc_X.transform(np.array([[0, 0, 600, 1, 40, 3, 60000, 2, 1, 1, 50000]])))
new_prediction = (new_prediction > 0.5)

# Making the Confusion Matrix
cm = confusion_matrix(y_test, y_pred)

# Part 4 - Evaluating, improving and tuning the ANN

# Evaluate the ANN
def build_classifier():
    classifier = Sequential()
    classifier.add(Dense(units = 6, kernel_initializer = 'random_uniform', activation = 'relu', input_shape=(11,)))
    classifier.add(Dense(units = 8, kernel_initializer = 'random_uniform', activation = 'relu'))
    classifier.add(Dense(units = 1, kernel_initializer = 'random_uniform', activation = 'sigmoid'))
    classifier.compile(optimizer = 'rmsprop', loss = 'binary_crossentropy', metrics = ['accuracy'])
    return classifier

classifier = KerasClassifier(build_fn = build_classifier, batch_size = 25, epochs = 500)
accuracies = cross_val_score(estimator = classifier, X = X_train, y = y_train, cv = 10, n_jobs = -1)
mean = accuracies.mean()
variance = accuracies.std()

# Improve the ANN

# Tune the ANN
def build_classifier(optimizer = 'adam'):
    classifier = Sequential()
    classifier.add(Dense(units = 6, kernel_initializer = 'random_uniform', activation = 'relu', input_shape=(11,)))
    classifier.add(Dense(units = 6, kernel_initializer = 'random_uniform', activation = 'relu'))
    classifier.add(Dense(units = 1, kernel_initializer = 'random_uniform', activation = 'sigmoid'))
    classifier.compile(optimizer = optimizer, loss = 'binary_crossentropy', metrics = ['accuracy'])
    return classifier

classifier = KerasClassifier(build_fn = build_classifier)
parameters = {'batch_size': [25, 32], 'epochs': [100, 500], 'optimizer': ['adam', 'rmsprop']}
grid_search = GridSearchCV(estimator = classifier, param_grid = parameters, cv = 10, scoring = 'accuracy')
grid_search = grid_search.fit(X_train, y_train)
best_parameters = grid_search.best_params_
best_accuracy = grid_search.best_score_