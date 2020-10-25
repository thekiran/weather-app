const form = document.querySelector('form');
const submit = document.querySelector('.btn');
const w = document.querySelector('#w');
const c = document.querySelector('#c');

submit.addEventListener('click', async (e) => {
	e.preventDefault();
	const cname = form.querySelector('#kiran').value;
	const res = await fetch('http://localhost:5000/city/' + cname);
	if (res.status === 200) {
		const data = await res.json();
		console.log(data);
		w.innerHTML = `
        <div id="w2"></div>
        <div class="card" id="w3">
            <div class="card-body" >
              <h5 class="card-title">Weather INF0</h5>
              <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
              <p class="card-text">temp is ${data.main.temp} and max temp is ${data.main.temp_max}
              and desc is ${data.weather[0].description}
              </p>
              <a href="#" class="card-link">More Info</a> 
            </div>
          </div>
        `;
	}
});

c.addEventListener('click', (e) => {
	e.preventDefault();
	const sp = async (p) => {
		const lat = p.coords.latitude;
		const lon = p.coords.longitude;
		console.log(`http://localhost:5000/pos/${lat}/${lon}`);

		const response = await fetch(`http://localhost:5000/pos/${lat}/${lon}`);

		const data = await response.json();
		w.innerHTML = `
        <div id="w2"></div>
        <div class="card" id="w3">
            <div class="card-body" >
              <h5 class="card-title">Weather INF0</h5>
              <h6 class="card-subtitle mb-2 text-muted">${data.name}</h6>
              <p class="card-text">temp is ${data.main.temp} and max temp is ${data.main.temp_max}
              and desc is ${data.weather[0].description}
              </p>
              <a href="#" class="card-link">More Info</a> 
            </div>
          </div>
        `;
	};
	const loc = () => {
		if (navigator.geolocation) {
			return navigator.geolocation.getCurrentPosition(sp);
		}
	};
	const res = loc();
	//console.log(res);
});
