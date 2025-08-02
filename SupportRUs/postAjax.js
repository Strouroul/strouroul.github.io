function postAjax_ASYNC(url, data, success) {

    return new Promise((resolve, reject) => {
        let my_data = "";

        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                my_data = xhr.responseText;
                resolve(success(xhr.responseText));
                //  return (xhr.responseText);

            } else if (xhr.readyState > 3 && xhr.status !== 200) {
                reject("Request failed with status: " + xhr.status);
            }
            /*else {

                reject ( "Request failed with status: " + xhr.status);
            }*/
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    })
}