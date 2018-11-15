<?php

echo "

<nav id=\"nav\" class=\"navbar navbar-expand-lg navbar-light bg-light\" style=\"padding: 0px;\">
  <div class=\"collapse navbar-collapse navigation\" id=\"navbarSupportedContent\">
    <ul class=\"nav navbar-nav mx-auto\">
      <li class=\"nav-item\">
        <a class=\"nav-link\" href=\"./index.php#nav\">Home</a>
      </li>
      <!--
      <li class=\"nav-item\">
        <a class=\"nav-link\" data-scroll id=\"nav-latest\" href=\"#\">Latest Post</a>
      </li>
      -->
      <li class=\"nav-item\">
        <a class=\"nav-link\" data-scroll id=\"nav-latest\" href=\"blogs.php#nav\">Blog</a>
      </li>
      <li class=\"nav-item\">
        <a class=\"nav-link\"  data-scroll href=\"magazines.php#nav\">Magazine</a>
      </li>
      <li class=\"nav-item\">
        <a class=\"nav-link\"  data-scroll href=\"index.php\"><img style=\"height:50px; position:relative; top:-20px;  margin-bottom:-20px;\" src=\"./images/home-slider/ctc-logo.png\" alt=\"\"> </a>
      </li>
      <li class=\"nav-item dropdown\">
        <a class=\"nav-link dropdown-toggle\" href=\"about.php#nav\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
          About
        </a>
        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">
          <a class=\"dropdown-item\" href=\"about.php#nav\">About CTC</a>
          <a class=\"dropdown-item\" href=\"team.php#nav\">Team</a>
        </div>
      </li>
      <li class=\"nav-item\">
        <a class=\"nav-link\" data-scroll href=\"./contact.php#nav\">Contact Us</a>
      </li>
      <li class=\"nav-item\">
        <a class=\"nav-link\" target=\"_blank\" data-scroll href=\"https://www.patreon.com/coffeetablecoven\">Patreon</a>
      </li>

    </ul>
  </div>
</nav>

";

?>
