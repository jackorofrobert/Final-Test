const API_BASE_URL = 'http://localhost:3000/api/movies';

// Fetch all movies
export const fetchMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

// Add a new movie
export const addMovie = async (movieData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to add new movie:', error);
    throw error;
  }
};

// Update an existing movie
export const updateMovie = async (id, movieData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to update movie:', error);
    throw error;
  }
};

// Delete a movie
export const deleteMovie = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to delete movie:', error);
    throw error;
  }
};

// Search movies by name
export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?name=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to search movies:', error);
    throw error;
  }
};

// Sort movies by year
export const sortMoviesByYear = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sort/year`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to sort movies:', error);
    throw error;
  }
};
