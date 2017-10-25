<template>
    <div class="row layout-row">

        <div class="col s1 left-layout blue-grey darken-4">

            <ul class="social-icons">

                <!--<div class="app-preloader-wrapper">-->
                <!--<div class="app-preloader-spinner"></div>-->
                <!--</div>-->

                <li v-for="(app, index) in apps" @click="openApp(index)" :class="app.name.toLowerCase()"
                    :title="app.name.toUpperCase()">
          <span class="app-preloader-wrapper" v-if="loading && activeApp == app.name">
            <div class="app-preloader-spinner"></div>
          </span>

                    <img id="appIcon" :src="appIcon(app.icon)" alt="">
                </li>
            </ul>

        </div>

        <div class="col s11 right-layout blue-grey lighten-3 center">
            <div v-if="!appActive" class="placeholder">

                <!--LOGO-->
                <div id="logo" class="blue-grey">
                    <h2>SL</h2>
                </div>

                <h3>
                    Welcome to <span class="blue-grey-text"><b>Social Life</b></span>
                </h3>
                <p>
                    Social life just got better...
                </p>
            </div>

            <div class="app-view-wrapper" v-if="appActive">

                <webview v-for="app in apps" v-show="activeApp === app.name"
                         :preload="preload"
                         v-bind:id="app.name+'-app-view'" :class="'app-view-webview app-view'+app.name"
                         :src="app.url" allowpopups>
                </webview>

            </div>

        </div>

    </div>
</template>

<script>
    const path = require('path')

    export default {
        data: function () {
            return {
                preload: `file:${path.join(path.resolve(__dirname), 'context.js')}`,
                /**
                 * check if any app is activated
                 * @type {boolean}
                 */
                appActive: false,

                /**
                 * name of active app
                 * @type {string}
                 */
                activeApp: '',

                /**
                 * Active app home url
                 * @type {string}
                 */
                activeAppHomeUrl: '',

                /**
                 * address of app to load
                 * @type {string}
                 */
                appUrl: '',

                /**
                 * activated apps
                 * @type {Array}
                 */
                activatedApps: [],

                /**
                 * indicate that a request is in progress
                 * @type {boolean}
                 */
                loading: false,

                /**
                 * all apps
                 * @type {{name: string, icon: string, url: string}[]}
                 */
                apps: [
                    {'name': 'Facebook', 'icon': 'fb.png', 'url': 'https://www.facebook.com'},
                    {'name': 'Twitter', 'icon': 'twitter.png', 'url': 'https://www.twitter.com'},
                    {'name': 'Instagram', 'icon': 'instagram.png', 'url': 'https://www.instagram.com'},
                    {'name': 'Telegram', 'icon': 'telegram.png', 'url': 'https://web.telegram.org'},
                    {'name': 'WhatsApp', 'icon': 'whatsapp.png', 'url': 'https://web.whatsapp.com'},
                    {'name': 'Slack', 'icon': 'slack.png', 'url': 'https://slack.com'},
                    {'name': 'Linkedin', 'icon': 'linkedin.png', 'url': 'https://www.linkedin.com'},
                    {'name': 'Youtube', 'icon': 'youtube.png', 'url': 'https://www.youtube.com'}
                ]
            }
        },
        methods: {
            appIcon(icon) {
                return 'static/images/icon/' + icon
            },

            openApp(index) {
                let app = this.apps[index]
                this.activeAppHomeUrl = app.url
                this.appActive = true
                this.activeApp = app.name

                let $this = this
                let webview = document.getElementById(app.name + '-app-view')

                // indicate request by displaying loading on top of the app icon
                if (webview !== null) {
                    webview.addEventListener('did-start-loading', function () {
                        $this.loading = true
                    })

                    webview.addEventListener('did-stop-loading', function () {
                        $this.loading = false
                    })
                }

                if (this.appActive && this.activeApp !== app.name) {
                    localStorage.setItem(this.activeApp, webview.getURL())
                    app.url = (localStorage.getItem(app.name) === null) ? app.url : localStorage.getItem(app.name)
                    this.activeApp = app.name

                    return true
                }

                app.url = (localStorage.getItem(app.name) === null) ? app.url : localStorage.getItem(app.name)
            }
        }
    }
</script>

<style>

    html, body, #app {
        height: 100%;
    }

    #logo {
        height: 90px;
        width: 90px;
        margin-left: auto;
        margin-right: auto;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        z-index: 10;
    }

    #logo h2 {
        color: #fff;
        font-weight: bolder;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        margin: 0;
        padding: 0;
        position: relative;
        top: 15%;
    }

    img#appIcon {
        width: 90%;
    }

    .social-icons li {
        margin-bottom: 5px;
        cursor: pointer;
    }

    .layout-row {
        height: 100%;
        margin-bottom: 0;
    }

    .left-layout {
        height: 100%;
        display: table;
        width: 4.3333333333% !important;
    }

    .right-layout {
        height: 100%;
        padding: 0 !important;
        width: 95.6666666667% !important;
    }

    .placeholder {
        position: relative;
        top: 35%;
    }

    .social-icons {
        text-align: center;
    }

    .social-icons li img {
        transition: all .2s ease-in-out;
    }

    .social-icons li:hover > img {
        transform: scale(1.3);
    }

    .app-view-wrapper {
        height: 100%;
        overflow: hidden;
    }

    .app-view-webview {
        height: 100%;
    }

    #loader {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fefefe;
        height: 100%;
        z-index: 200;
    }

    .loader-spinner {
        width: 128px;
        height: 128px;
        position: absolute;
        background-image: url('/static/images/logo.png');
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        -webkit-animation-name: spin;
        -webkit-animation-duration: 1000ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
    }

    .loader-spinner:before {
        content: "";
        display: block;
        position: absolute;
    }

    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .app-preloader-wrapper {
        position: absolute;
        left: 1%;
        z-index: 20000;
    }

    .app-preloader-spinner {
        width: 30px;
        height: 30px;
        position: absolute;
        margin: auto;
        border: 3px solid rgba(226, 226, 226, 0.75);
        border-radius: 100%;
        /*animation: rotation 1s infinite linear;*/
        -webkit-animation-name: spin;
        -webkit-animation-duration: 1000ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
    }

    .app-preloader-spinner:before {
        content: "";
        display: block;
        position: absolute;
        left: -3px;
        top: -3px;
        height: 30px;
        width: 30px;
        border-top: 3px solid #607d8b;
        border-left: 3px solid #607d8b;
        border-bottom: 3px solid transparent;
        border-right: 3px solid #607d8b;
        border-radius: 100%;
    }
</style>
