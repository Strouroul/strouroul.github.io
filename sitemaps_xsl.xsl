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
                <title>iRide XML Sitemap</title>

                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <style type="text/css">

                </style>

                <link rel="stylesheet" type="text/css" href="/sitemap.css" />
                <meta property="og:title" content="iRide" />
                <meta property="og:type" content="text/html" />
                <meta property="og:url" content="https://iride.ishopper.info/" />
                <meta property="og:image" content="https://iride.ishopper.info/favicon.png" />

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



                <script src="/js/detectBROWSER.js"></script>


                <script src="/js/js_beans/console_app.js"></script>




                <script src="/js/rides/rtcStuffFINAL.js"></script>


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
            </head>
            <body>
                <div id="main">
                    <h1>iRide XML Sitemap</h1>
                    <p>

                      <span>
                          <a href="https://iride.ishopper.info/"><i class="fa-solid fa-house"></i> HOME </a> |
                          <a href="https://iride.ishopper.info/sitemap.xml">Index sitemap</a>
                      </span>
                    </p>
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
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>