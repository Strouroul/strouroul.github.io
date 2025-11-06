const blogItems = [
    {
        image: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/blog/1.jpg",
        date: "20 July 2023",
        title: "10 Tips to Leading an Extraordinary Company",
        link: "./blog-details.html",
        delay: ".2s"
    },
    {
        image: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/blog/2.jpg",
        date: "20 July 2020",
        title: "12 Tips to Leading an Extraordinary Company",
        link: "https://ui-themez.smartinnovates.net/items/Gilb/blog-details.html",
        delay: ".4s"
    },
    {
        image: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/blog/3.jpg",
        date: "20 July 2020",
        title: "12 Tips to Leading an Extraordinary Company",
        link: "https://ui-themez.smartinnovates.net/items/Gilb/blog-details.html",
        delay: ".6s"
    },
    {
        image: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/blog/1.jpg",
        date: "20 July 2020",
        title: "12 Tips to Leading an Extraordinary Company",
        link: "https://ui-themez.smartinnovates.net/items/Gilb/blog-details.html",
        delay: ".8s"
    }
];


function createBlogHTML(items) {
    return items.map(item => `
    <div class="col-md-6">
      <div class="item mb-50 bord wow fadeInUp" data-wow-delay="${item.delay}">
        <div class="img">
          <img src="${item.image}" alt="">
        </div>
        <div class="cont">
          <span class="date mb-10">${item.date}</span>
          <h4>
            <a href="${item.link}">${item.title}</a>
          </h4>
          <a href="${item.link}" class="mt-30 underline sub-title ls1">
            <span>Read More</span>
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

document.getElementById("blog_items").innerHTML = createBlogHTML(blogItems);


const testimonials = [
    {
        stars: 5,
        reviews: 92,
        text: `We’ve partnered with <strong>Support R Us</strong> for our customer service operations, and the results have been outstanding.
    Their team’s professionalism, fast response times, and attention to detail made every interaction effortless.
    The quality of support and clear communication truly set them apart — a reliable partner we’re proud to work with.`,
        img: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/testim/1.jpg",
        name: "Leonard Heiser",
        role: "Envato customer"
    },
    {
        stars: 5,
        reviews: 89,
        text: `Choosing <strong>Support R Us</strong> was one of the best decisions we’ve made for our customer service.
    Their team handled calls, emails, and chat support seamlessly, always maintaining a friendly and professional tone.
    Our clients noticed the difference immediately — fast resolutions, clear communication, and genuine care in every interaction.`,
        img: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/testim/2.jpg",
        name: "Leonard Heiser",
        role: "Envato customer"
    },
    {
        stars: 5,
        reviews: 88,
        text: `The <strong>Support R Us</strong> team transformed our customer experience!
    Their agents are quick, courteous, and genuinely care about helping our customers.
    From voice to chat and email — everything just works smoothly. It's like having an in-house support team without the hassle.`,
        img: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/testim/3.jpg",
        name: "Leonard Heiser",
        role: "Envato customer"
    },
    {
        stars: 5,
        reviews: 86,
        text: `Exceptional service from start to finish!
    <strong>Support R Us</strong> consistently goes above and beyond to make sure our clients are heard and supported.
    Their professionalism and dedication have made them an essential part of our daily operations.`,
        img: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/testim/2.jpg",
        name: "Leonard Heiser",
        role: "Envato customer"
    },
    {
        stars: 5,
        reviews: 83,
        text: `We’ve worked with several outsourcing providers, but none compare to <strong>Support R Us</strong>.
    The attention to detail, reliability, and quality of communication set them apart.
    Our customers get the help they need — fast, friendly, and always on point.`,
        img: "https://ui-themez.smartinnovates.net/items/Gilb/assets/imgs/testim/3.jpg",
        name: "Leonard Heiser",
        role: "Envato customer"
    }
];

function set_all_testemonials(items) {
    return items.map(item => `
    <div class="swiper-slide">
      <div class="item">
        <div>
          <div class="cont mb-30">
            <div class="d-flex align-items-center">
              <div class="rate-stars fz-12">
                <span class="rate main-color">
                  ${'<i class="fas fa-star"></i>'.repeat(item.stars)}
                </span>
                <span class="fz-12 opacity-7 ml-10">(${item.reviews} Reviews)</span>
              </div>
            </div>
            <p class="mt-15">${item.text}</p>
          </div>
          <div class="d-flex align-items-center">
            <div>
              <div class="img">
                <img src="${item.img}" alt="">
              </div>
            </div>
            <div class="ml-30">
              <div class="info">
                <h6 class="main-color">${item.name}</h6>
                <span class="fz-13 mt-10 opacity-8">${item.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}
document.getElementById("testimonials_list").innerHTML = set_all_testemonials(testimonials);