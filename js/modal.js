const modal = () => {
	const modal = document.querySelector('.search-model')
	const modalBtn = document.querySelector('.icon_search')
	const modalClose = modal.querySelector('.search-close-switch')
	const searchInput = document.getElementById('search-input');
	const wrapper = document.querySelector('.search-model-result')
	
	wrapper.style.width = '100%'
	wrapper.style.maxWidth = '500px'

	const debounce = (func, ms = 500) => {
		let timer

		return(...args) => {
			clearTimeout(timer)
			timer = setTimeout(() => {func.apply(this, args)}, ms)
		}
	}

	const searchDebounce = debounce((searchString) => {
		searchFunc(searchString)
	})

	const renderFunc = (items) => {
		wrapper.innerHTML = ''

		items.forEach(item => {
			wrapper.insertAdjacentHTML('afterbegin', `
				<a class="p-2" href="#">${item.title}</a>
			`)
		})
	}

	const searchFunc = (searchStr) => {
		fetch('https://anime-2e860-default-rtdb.firebaseio.com/anime.json')
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				const filteredData = data.filter(dataItem => {
					return dataItem.title.toLowerCase().includes(searchStr.toLowerCase()) 
					|| dataItem.description.toLowerCase().includes(searchStr.toLowerCase())
				})

				renderFunc(filteredData.slice(0,5))
			})
	}

	modalBtn.addEventListener('click', () => {
		// modal.style.display = 'block'
		modal.classList.add('active')
	})

	modalClose.addEventListener('click', () => {
		// modal.style.display = 'none'
		searchInput.value = ''
		wrapper.innerHTML = ''
		modal.classList.remove('active')
	})

	searchInput.addEventListener('input', (event) => {
	  searchDebounce(event.target.value)
	});
}

modal()