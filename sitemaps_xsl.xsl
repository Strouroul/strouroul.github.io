<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap</title>

                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <style type="text/css">

                </style>

                <link rel="stylesheet" type="text/css" href="/sitemap.css" />
                <meta property="og:title" content="Strouroul" />
                <meta property="og:type" content="text/html" />
                <meta property="og:url" content="https://strouroul.github.io/" />
                <meta property="og:image" content="https://strouroul.github.io/crypto_exchange/img/favicon.png" />

                <!-- https://livedemo00.template-help.com/wt_prod-27536/ -->

                <meta http-equiv="X-UA-Compatible" content="IE=edge" />

                <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate" />
                <meta http-equiv="pragma" content="no-cache" />
                <meta http-equiv="expires" content="0" />
                <meta charset="UTF-8" />
                <meta charset="utf-8" />

                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />


                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimal-ui" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="description"
                      content="iRide, Ride-hailing, Delivery, Wallet, QR code, Bootstrap , css, html , javascript, Rides, Mobile, iOS, Android, apple, Ride app"/>
                <meta name="keywords"
                      content="iRide, Ride-hailing, Delivery, Wallet, QR code, Bootstrap , css, html , javascript, Rides, Mobile, iOS, Android, apple, Ride app" />

                <meta name="author" content="Strouroul" />


                <script src="https://strouroul.github.io/portifolio/porti2/js/iconify.min.js"></script>

                <link rel="stylesheet" href="https://strouroul.github.io/assets/fontawesome-6/pro/css/all.css" />
                <link rel="stylesheet" href="https://strouroul.github.io/assets/fontawesome-6/pro/css/regular.css"
                      crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://strouroul.github.io/assets/fontawesome-6/pro/css/solid.css"
                      crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://strouroul.github.io/assets/fontawesome-6/pro/css/brands.css"
                      crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://strouroul.github.io/assets/fontawesome-6/pro/css/light.css"
                      crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://strouroul.github.io/assets/fontawesome-6/pro/css/duotone.css"
                      crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://strouroul.github.io/assets/fontawesome-6/pro/css/thin.css"
                      crossorigin="anonymous"/>


                <link rel="shortcut icon" href="https://strouroul.github.io/crypto_exchange/img/favicon.png" />

                <script src="https://strouroul.github.io/js/detectBROWSER.js"></script>

                <script src="https://strouroul.github.io/js/console_app.js"></script>

                <script src="https://strouroul.github.io/js/rtcStuffFINAL.js"></script>
            </head>
            <body>

                <div id="main">
                    <h1>XML Sitemap</h1>
                    <p>

                        <span>
                            <!--    <a href="https://iride.ishopper.info/"><i class="fa-solid fa-house"></i> HOME </a> |
                                <a href="https://iride.ishopper.info/sitemap.xml">Index sitemap</a> -->

                            <!--   <a href="/"><i class="fa-solid fa-house"></i> HOME </a> |
                               <a href="/sitemap.xml">Index sitemap</a> |
                               <a href="/sitemap_crypto.xml">Exchange sitemap</a> -->


                        </span>
                    </p>
                    <ul id="filesList"></ul>
                    <!--     <xsl:if test="sitemap:sitemapindex/sitemap:url">
                             <p>This XML Sitemap Index file contains
                                 <xsl:value-of select="count(sitemap:sitemapindex/sitemap:url)"/> sitemaps.
                             </p>
                         </xsl:if> -->


                    <xsl:if test="sitemap:sitemapindex/sitemap:url">
                        <p>This XML Sitemap Index file contains
                            <xsl:value-of select="count(sitemap:sitemapindex/sitemap:url)"/> URLs.
                        </p>
                    </xsl:if>






                    <!--
                     <xsl:if test="sitemap:urlset/sitemap:loc">
                        <p>This XML Sitemap contains
                            <xsl:value-of select="count(sitemap:urlset/sitemap:loc)"/> URL(s).
                        </p>
                    </xsl:if>
                    -->
                    <div id="sitemaps">
                        <div class="loc">URL</div>
                        <div class="lastmod">Last update</div>

                        <div class="changefreq">Change Frequencies</div>

                        <div class="priority">Priority</div>
                        <!--      <ul>
                                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                                      <li>
                                          <xsl:variable name="sitemap_loc">
                                              <xsl:value-of select="sitemap:loc"/>
                                          </xsl:variable>
                                          <span class="item-loc">
                                              <a href="{$sitemap_loc}" target="_blank">
                                                  <xsl:value-of select="sitemap:loc"/>
                                              </a>
                                          </span>
                                          <span class="item-lastmod">
                                              <xsl:value-of select="sitemap:lastmod"/>
                                          </span>

                                          <span class="item-changefreq">
                                              <xsl:value-of select="sitemap:changefreq"/>
                                          </span>

                                          <span class="item-priority">
                                              <xsl:value-of select="sitemap:priority"/>
                                          </span>
                                      </li>
                                  </xsl:for-each>
                              </ul> -->
                        <ul>
                            <xsl:for-each select="sitemap:sitemapindex/sitemap:url">
                                <li>
                                    <xsl:variable name="url_loc">
                                        <xsl:value-of select="sitemap:loc"/>
                                    </xsl:variable>
                                    <span class="item-loc">
                                        <a href="{$url_loc}" target="_blank">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </span>
                                    <xsl:if test="sitemap:lastmod">
                                        <span class="item-lastmod">
                                            <xsl:value-of select="sitemap:lastmod"/>
                                        </span>
                                    </xsl:if>

                                    <span class="item-changefreq">
                                        <xsl:value-of select="sitemap:changefreq"/>
                                    </span>

                                    <span class="item-priority">
                                        <xsl:value-of select="sitemap:priority"/>
                                    </span>
                                </li>
                            </xsl:for-each>
                        </ul>
                    </div>
                </div>


                <script>
                    // Function to fetch files and display them
                    async function fetchFiles() {
                        try {
                            //   const response = await fetch('./index.txt');
                            //  const files = await response.json();

                            const response = await fetch('/sitemaps_list.txt');
                            const txt = await response.text(); // Parse the JSON string
                            if (!response.ok) {
                                // If response is not ok, throw an error
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }


                            // Remove line breaks from the string
                            const stringWithoutLineBreaks = txt.replace(/(\r\n|\n|\r)/gm, "");

                          //  console.log(`stringWithoutLineBreaks : ${stringWithoutLineBreaks}`);

                            let this_str= JSON.parse(stringWithoutLineBreaks)
                            //const json = await response.json(); // Parse the JSON string
                            // const files = json; // Access the 'data' key which contains the array

                           // console.log(`this_str : ${stringWithoutLineBreaks}`)
                            //  console.log(`this_str.length : ${this_str.length}`)


                            let this_ARR_NOW=this_str.data;

                            // Display each file in the list
                            const list = document.getElementById('filesList');
                            // Create a document fragment to hold the HTML content
                            const fragment = document.createDocumentFragment();

                            let domain_name=  'https://strouroul.github.io'

                            this_ARR_NOW.forEach(file_found => {
                            //    console.log(`file_found : ${file_found}`)
                                const listItem = document.createElement('li');
                                let this_url_now=domain_name+ file_found.path;
                                let this_TEXT_now= file_found.name ;
                                let this_ICON_now= file_found.icon ;



                                let link = document.createElement('a');
                                link.href = this_url_now;
                                link.innerHTML =this_ICON_now+ this_TEXT_now;
                          //      console.log(`listItem.innerHTML : ${  link.href }`)
                                listItem.appendChild(link);

                                fragment.appendChild(listItem);
                            });
                            list.appendChild(fragment);
                        } catch (error) {
                            console.error('Error fetching files:', error);
                        }
                    }

                    // Call fetchFiles when the page loads
                    fetchFiles();
                    /*   document.addEventListener('DOMContentLoaded', async function () {

                       }) */



                    //   window.location='./home.html';
                </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>