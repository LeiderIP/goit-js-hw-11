export default class Gallery {
  constructor(data, canvasId, loadMoreCallback) {
    this.data = data;
    this.canvas = document.getElementById(canvasId);
    this.callback = loadMoreCallback;
  }

  renderGallery() {
    let loadMoreContainer = this.canvas.querySelector('#loadMoreContainer');
    if (loadMoreContainer) {
      loadMoreContainer.remove();
    }

    let toRenderText = this.data.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="card">
                        <img src="${webformatURL}" class="card-img-top" alt="...." data-picture='${largeImageURL}'/>
                        <div class="card-body"> 
                        <p class="card-text">
                            ${comments}
                            ${likes}
                            ${views}
                            ${downloads}
                            ${tags}
                        </p>
                        </div> 
                    </div>`;
      }
    );
    let button = document.createElement('button');
    let div = document.createElement('div');
    div.id = 'loadMoreContainer';
    div.style.width = '100%';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    button.type = 'button';
    button.classList.add('load-more');
    button.textContent += 'Cargar más';
    button.addEventListener('click', async () => {
      this.data = await this.callback();
      this.renderGallery();
    });
    this.canvas.innerHTML += toRenderText;
    div.append(button);
    this.canvas.append(div);
  }
}
