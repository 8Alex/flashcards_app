import { makeAutoObservable, runInAction } from 'mobx';
export default class WordsStore {
  constructor() {
    this.words = [];
    this.isLoading = false;
    this.error = false;
    makeAutoObservable(this);
  }

  async loadData() {
    this.isLoading = true;

    await fetch('itgirlschool/api/words')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.error = true;
        }
      })
      .then((response) => {
        runInAction(() => {
          this.error = false;
          this.words = response;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.error = true;
          console.log(error);
        });
      })
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  async editWords(id) {
    await fetch(`itgirlschool/api/words/${id}/update`, {
      method: 'POST',
      body: JSON.stringify(this.words.find((word) => word.id == id)),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.loadData();
        } else {
          this.error = true;
        }
      })
      .catch((error) => {
        runInAction(() => {
          this.error = true;
          console.log(error);
        });
      });
  }

  async deleteWords(id) {
    await fetch(`itgirlschool/api/words/${id}/delete`, {
      method: 'POST',
      body: JSON.stringify(this.words.filter((word) => word.id !== id)),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.loadData();
        } else {
          this.error = true;
        }
      })
      .catch((error) => {
        runInAction(() => {
          this.error = true;
          console.log(error);
        });
      });
  }

  async addWords(word) {
    await fetch('itgirlschool/api/words/add', {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.loadData();
        } else {
          this.error = true;
        }
      })
      .then(() => {
        runInAction(() => {
          this.words.push(word);
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.error = true;
          console.log(error);
        });
      });
  }
}
