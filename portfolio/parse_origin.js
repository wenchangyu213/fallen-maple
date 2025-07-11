let baseSearchPriority = 0;

// 初始化页面
document.addEventListener('DOMContentLoaded', async function () {

    baseSearchPriority = getQueryParam('p') || 0;

    // 搜索功能
    document.getElementById('search-input').addEventListener('input', filterPortfolio);

    // 标签点击事件
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', toggleTag);
    });

    // 按钮事件
    document.getElementById('show-all').addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('active'));
        renderPortfolio();
    });

    document.getElementById('show-high-priority').addEventListener('click', () => {
        document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('active'));
        renderPortfolio('', [], 9);
    });

    document.getElementById('footer').innerHTML = `© 2025 ${getQueryParam('name') || '俞文昶'} 个人作品集展示 | 精心制作，持续更新`;

    const nowDate = new Date().getTime();
    const te = getQueryParam('te');// 允许查询的最大时间戳
    if (te && nowDate > te) return;

    // 渲染页面
    renderTags();
    renderPortfolio();
});

// 获取所有标签
function getAllTags() {
    const tags = new Set();
    portfolioData.categories.forEach(category => {
        category.items.forEach(item => {
            item.tags.forEach(tag => tags.add(tag));
        });
    });
    return Array.from(tags);
}

// 渲染标签
function renderTags() {
    const tagsContainer = document.getElementById('tags-container');
    const tags = getAllTags();

    tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.dataset.tag = tag;
        tagsContainer.appendChild(tagElement);
    });
}

// 切换标签状态
function toggleTag() {
    this.classList.toggle('active');
    filterPortfolio();
}

// 获取选中的标签
function getSelectedTags() {
    const selectedTags = [];
    document.querySelectorAll('.tag.active').forEach(tag => {
        selectedTags.push(tag.dataset.tag);
    });
    return selectedTags;
}

// 过滤作品集
function filterPortfolio() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const selectedTags = getSelectedTags();

    renderPortfolio(searchText, selectedTags);
}

// 渲染作品集
function renderPortfolio(searchText = '', selectedTags = [], searchPriority = 0) {
    searchPriority = searchPriority || baseSearchPriority;
    const portfolioContainer = document.getElementById('portfolio-container');
    portfolioContainer.innerHTML = '';

    portfolioData.categories.forEach((category, index) => {
        // 过滤项目
        let filteredItems = category.items.filter(item => {
            // 文本搜索（标题或描述）
            const textMatch = searchText === '' ||
                item.title.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText);

            // 标签搜索
            const tagMatch = selectedTags.length === 0 ||
                selectedTags.some(tag => item.tags.includes(tag));

            // 优先级搜索
            const priorityMatch = item.priority >= searchPriority;

            return textMatch && tagMatch && priorityMatch;
        });

        // 按优先级排序
        filteredItems.sort((a, b) => b.priority - a.priority);

        // 如果有匹配的项目才显示分类
        if (filteredItems.length > 0) {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            categoryElement.innerHTML = `
                <div class="category-header" data-category-index="${index}">
                    <div class="category-title">${category.name}</div>
                    <div class="item-count">${filteredItems.length} 个项目</div>
                    <div class="toggle-icon">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div class="category-content">
                    ${filteredItems.map(item => createCardHTML(item)).join('')}
                </div>
            `;
            portfolioContainer.appendChild(categoryElement);

            // 添加折叠功能
            categoryElement.querySelector('.category-header').addEventListener('click', function () {
                const categoryIndex = this.dataset.categoryIndex;
                const categoryElement = document.querySelector(`.category-header[data-category-index="${categoryIndex}"]`).parentNode;
                categoryElement.classList.toggle('collapsed');
            });
        }
    });

    // 如果没有匹配的项目
    if (portfolioContainer.innerHTML === '') {
        portfolioContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>没有找到匹配的项目</h3>
                <p>请尝试不同的搜索词或标签组合</p>
            </div>
        `;
    }
}

// 创建卡片HTML
function createCardHTML(item) {
    const isPriorityHigh = item.priority >= 9;

    return `
        <div class="card ${isPriorityHigh ? 'priority-high' : ''}">
            <img src="${item.image}" alt="${item.title}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                <div class="card-tags">
                    ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                </div>
                <a href="${item.link}" class="card-link" target="_blank">预览项目</a>
            </div>
        </div>
    `;
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || '';
}