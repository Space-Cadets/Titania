from app import app

# Add SSL Here when cert is ready
if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')