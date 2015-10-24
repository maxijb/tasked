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

		tags.map((tag, index) => {
			if (tag.name) {
				let label = tag.name.substr(0,1).toUpperCase();
				if (!labels.hasOwnProperty(label)) {
					labels[label] = index;
				} else {
					disambiguate(labels[label], index);
				}
			}
		});

		for (let i in labels) {
			tags[labels[i]].label = i;
		}

		return tags;

		function disambiguate(a, b) {
			let lenA = tags[a].name.length,
				lenB = tags[b].name.length,
				maxLen = lenA == lenB ? lenB : Math.min(lenA, lenB) + 1;

			let keyA = "", keyB = "";
			for (let i = 0; i < maxLen; i++) {
				keyA += tags[a].name.substr(i, 1);
				keyB += tags[b].name.substr(i, 1);
				
				if (i == 0) { 
					keyA = keyA.toUpperCase(); 
					keyB = keyB.toUpperCase()
				}

				if (keyB != keyA) {
					labels[keyA] = a;
					labels[keyB] = b;
					break;
				}
			}
		}
	}
})