from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import numpy as np
import requests
from bs4 import BeautifulSoup
from typing import Dict, List
from ..models import AwesomeList, Category, Link

class MLService:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.model = MultinomialNB()
        self.keywords = {
            'encoding': ['encoder', 'codec', 'compression', 'transcoding'],
            'streaming': ['rtmp', 'hls', 'dash', 'live'],
            'players': ['player', 'playback', 'video player', 'media player'],
            'tools': ['analyzer', 'probe', 'inspector', 'validator']
        }

    async def train_model(self, awesome_list: AwesomeList):
        categories = awesome_list.category_set.all()
        X = []
        y = []

        for category in categories:
            for link in category.link_set.all():
                content = await self._fetch_content(link.url)
                X.append(content)
                y.append(category.name)

        X_vec = self.vectorizer.fit_transform(X)
        self.model.fit(X_vec, y)

    async def predict_category(self, url: str) -> str:
        content = await self._fetch_content(url)
        X_vec = self.vectorizer.transform([content])
        return self.model.predict(X_vec)[0]

    async def _fetch_content(self, url: str) -> str:
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            text = ' '.join([
                h.text for h in soup.find_all(['h1', 'h2', 'h3', 'p'])
            ])
            return text
        except:
            return 