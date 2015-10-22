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