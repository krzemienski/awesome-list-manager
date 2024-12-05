const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async getLists() {
    const response = await fetch(`${API_URL}/api/lists/`);
    return response.json();
  },

  async importList(githubUrl) {
    const response = await fetch(`${API_URL}/api/lists/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ github_url: githubUrl }),
    });
    return response.json();
  },

  async validateList(listId) {
    const response = await fetch(`${API_URL}/api/lists/${listId}/validate/`, {
      method: 'POST',
    });
    return response.json();
  },

  async improveList(listId) {
    const response = await fetch(`${API_URL}/api/lists/${listId}/improve/`, {
      method: 'POST',
    });
    return response.json();
  },

  async downloadMarkdown(listId) {
    const response = await fetch(`${API_URL}/api/lists/${listId}/markdown/`);
    return response.blob();
  },

  async publishList(listId) {
    const response = await fetch(`${API_URL}/api/lists/${listId}/publish/`, {
      method: 'POST',
    });
    return response.json();
  }
};

export default api;
