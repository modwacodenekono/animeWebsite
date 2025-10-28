const detailData = () => {
	const preloader = document.querySelector('.preloder')

	const renderGanreList = (ganres) => {
		const dropDownBlock = document.querySelector('.header__menu .dropdown')

		dropDownBlock.innerHTML = ''

		ganres.forEach(ganre => {
			dropDownBlock.insertAdjacentHTML('beforeend', `
				<li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
			`)
		})

	}

	const renderAnimeDetails = (array, itemId) => {
		const animeObj = array.find(item => item.id == itemId)
		const imageBlock = document.querySelector('.anime__details__pic')
		const viewsBlock = imageBlock.querySelector('.view')
		const titleBlock = document.querySelector('.anime__details__title h3')
		const subTitleBlock = document.querySelector('.anime__details__title span')
		const desciptionBlock = document.querySelector('.anime__details__text p')
		const widgetList = document.querySelectorAll('.anime__details__widget ul li')
		const breadcrumb = document.querySelector('.breadcrumb__links span')

		if (animeObj) {
			imageBlock.dataset.setbg = animeObj.image
			viewsBlock.insertAdjacentHTML('beforeend', `
				<div class="view"><i class="fa fa-eye"></i> ${animeObj.views}</div>
			`)

			titleBlock.textContent = animeObj.title
			subTitleBlock.textContent = animeObj['original-title']
			desciptionBlock.textContent = animeObj.description
			breadcrumb.textContent = animeObj.ganre

			widgetList[0].insertAdjacentHTML('beforeend', `
                 <span>Date aired:</span> ${animeObj.date}
            `)
            widgetList[1].insertAdjacentHTML('beforeend', `
             	<span>Rating:</span> ${animeObj.rating}
            `)
            widgetList[2].insertAdjacentHTML('beforeend', `
         		<span>Genre:</span> ${animeObj.tags.join(', ')}
			`)


			document.querySelectorAll('.set-bg').forEach((elem) => {
				elem.style.backgroundImage = `url(${elem.dataset.setbg}`
			})

			setTimeout(() => {
				preloader.classList.remove('active')		
			}, 500)

		} else {
			console.log('not found');
		}
	}

	fetch('https://anime-2e860-default-rtdb.firebaseio.com/anime.json')
		.then((response) => response.json())
		.then((data) => {
			const ganres = new Set()
			const ganreParams = new URLSearchParams(window.location.search).get('itemId')

			data.forEach((item) => {
				ganres.add(item.ganre)
			})

			if (ganreParams) {
				renderAnimeDetails(data, ganreParams)
			} else {
				renderAnimeDetails(data, ganres)
			}
			renderGanreList(ganres)
		})
}

detailData()