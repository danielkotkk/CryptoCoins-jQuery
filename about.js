"use strict";
$(function () {

  $(document).off('click', "#aboutLink").on('click', "#aboutLink", function () {

    navBarActiveClass(this);

    $('body').css('background-image', `url()`);
    $("#contentDiv").empty();
    let html = `

        <div class="bg-light">
  <div class="container py-5">
    <div class="row h-100 align-items-center py-5">
      <div class="col-lg-6">
        <h1 class="display-4">About page</h1>

        </p>
      </div>
      <div class="col-lg-6 d-none d-lg-block"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png" alt="" class="img-fluid"></div>
    </div>
  </div>
</div>

<div class="bg-white py-5">
  <div class="container py-5">
    <div class="row align-items-center mb-5">
      <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
        <h2 class="font-weight-light">About the project</h2>
        <p class="font-italic text-muted mb-4">The project is about information of crypto coins, made as solution for people who trade crypto coins to follow their coins.</p>
      </div>
      <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg" alt="" class="img-fluid mb-4 mb-lg-0"></div>
    </div>
   
  </div>
</div>

<div class="bg-light py-5">
  <div class="container py-5">
    <div class="row mb-4">
      <div class="align-items-center col-12">
        <h2 class="text-center display-4 font-weight-light">About me</h2>

      </div>


    <div class="row d-inline-block m-auto text-center">
      
      <div class="col-12 mb-10">
        <div class="bg-white rounded shadow-sm py-20 px-4"><img src="/assets/images/myPic.jpg" alt="" width="60%" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
          <h5 class="mb-0">Daniel Kotlarov</h5><span class="small text-uppercase text-muted">Full Stack Web Developer</span>
          <ul class="social mb-0 list-inline mt-12">
            <li class="list-inline-item"><a href="https://www.facebook.com/daniel.kotlarov" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
            <li class="list-inline-item"><a href="https://www.instagram.com/danielkot24/" class="social-link"><i class="fa fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="https://www.linkedin.com/in/daniel-kotlarov-400574182/" class="social-link"><i class="fa fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
      

      

      

    </div>
  </div>
</div>


<footer class="bg-light pb-5">
  <div class="container text-center">
    <p class="font-italic text-muted mb-0">&copy; Copyrights Daniel Kotlarov All rights reserved.</p>
  </div>
</footer>
        `
    $("#contentDiv").append(html);
  })
})