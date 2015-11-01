export default angular.module('helpers', [])

.filter('i18n', function() {
	return function(input, transpolations) {
		
		return window.__.apply(null, [input].concat(transpolations||[]));
	}
})

.filter('safeHtml', ['$sce', function($sce) {
	 return $sce.trustAsHtml;
}])

.filter('reverse', function() {
  return function(items) {
    return items && items.length ? items.slice().reverse() : items;
  };
})

.filter('dateDistance', (i18nFilter) => {
	return (date) => {
		if (!date) return "";

		date = date.getTime ? date : new Date(date);

		let origTime = date.getTime(),
			nowDate  = new Date(),
			nowTime  = nowDate.getTime(),
			distance = nowTime - origTime,
			yesterday = new Date(nowDate);

			yesterday.setDate(nowDate.getDate() - 1);

		//seconds
		if (distance < 60 * 1000) {
			return i18nFilter("secondsAgo");
		} else if (distance < 60 * 60 * 1000) {
			return i18nFilter("%s minutesAgo", [Math.floor(distance / 60 / 1000)])
		} else if (distance < 24 * 60 * 60 * 1000 && date.getDate() == nowDate.getDate()) {
			return i18nFilter("todayAt %s:%s", [date.getHours(), date.getMinutes()])
		} else if (distance < 48 * 60 * 60 * 1000 && date.getDate() == yesterday.getDate()) {
			return i18nFilter("yesterdayAt %s:%s", [date.getHours(), date.getMinutes()])
		} else {
			//TODO improve this, how cross browser and i18n is
			return date.toDateString()
		}

	}
})
.factory('isChild', () => {
	return (child, parent) => {
		let item = child;
		while (item) {
			if (item == parent) return true;
			item = item.parentNode;
		}

		return false;
	}
})


.directive('resizeFullwidth', () => {
	return {
		link: (scope, element, attrs) => {
			let excepts = attrs.resizeExcept.split(',');



			let resize = () => {
				let sum = 0;
				excepts.map((x) => {
					let item = document.querySelector(x);
					sum += item ? item.clientHeight : 0;
				});
					
									
				window.a = element[0];
				window.b = (window.height - sum) + "px";
				element[0].style.height = (window.innerHeight - sum) + "px";
			}

			setTimeout(resize, 500);
			window.addEventListener('resize', resize);

		}
	}
})

.factory('disambiguateTagsLabels', () => {
	return (tags) => {
		let labels = {};
		//sort the array
		let work = [].concat(tags).sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1: 1 );

		let lastLabel = "";

		work.map((tag, index) => {
			if (tag.name) {
				
				let start;
				
				//if lastlabel check where to start looking comparing with previous tag
				if (lastLabel) {

					let compareTo = 1,
						found = false;
					
					//compare each carachter with previous
					while (compareTo <= tag.name.length && !found) {
						if (lastLabel.substr(0, compareTo) !== tag.name.substr(0, compareTo).toUpperCase()) {
							found = true;
							start = compareTo;
							break;
						}
						compareTo++;
					}
					start = start || tag.name.length;

				} else {
					//otherwise (no lastlabel) just start with the first cahracthter
					start = 1;
				}

				let label = "";

				//for each letetr from start
				for (let i = start; i <= tag.name.length; i++) {
					
					//find last label
					label = tag.name.substr(0,i).toUpperCase();
					let compareTo = index;
					let found = false,
						repeated = false;
					
					//compare with following items
					while (!found && compareTo < work.length - 1) {
						compareTo++;
						if (label !== work[compareTo].name.substr(0, i).toUpperCase()) found = true;
						else repeated = true;
					}
					
					if (!repeated) break;
				}
				
				
				tag.label = lastLabel = label;

			}
		});

		return tags;

	}
})