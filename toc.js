// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded affix "><a href="installation.html">Installation and Versions</a></li><li class="chapter-item expanded affix "><a href="sdk-version-compatibility.html">SDK Version Compatibility</a></li><li class="chapter-item expanded affix "><a href="provider-compatibility.html">Provider Compatibility</a></li><li class="chapter-item expanded affix "><li class="part-title">SDK Setup</li><li class="chapter-item expanded "><a href="setup/google-maps.html"><strong aria-hidden="true">1.</strong> Google Maps Setup</a></li><li class="chapter-item expanded "><a href="setup/mapbox.html"><strong aria-hidden="true">2.</strong> Mapbox Setup</a></li><li class="chapter-item expanded "><a href="setup/here-maps.html"><strong aria-hidden="true">3.</strong> HERE Maps Setup</a></li><li class="chapter-item expanded "><a href="setup/arcgis.html"><strong aria-hidden="true">4.</strong> ArcGIS Maps Setup</a></li><li class="chapter-item expanded affix "><li class="part-title">Core Components</li><li class="chapter-item expanded "><a href="components/mapviewcomponent.html"><strong aria-hidden="true">5.</strong> MapViewComponent</a></li><li class="chapter-item expanded "><a href="components/marker.html"><strong aria-hidden="true">6.</strong> Marker</a></li><li class="chapter-item expanded "><a href="components/infobubble.html"><strong aria-hidden="true">7.</strong> InfoBubble</a></li><li class="chapter-item expanded "><a href="components/circle.html"><strong aria-hidden="true">8.</strong> Circle</a></li><li class="chapter-item expanded "><a href="components/polyline.html"><strong aria-hidden="true">9.</strong> Polyline</a></li><li class="chapter-item expanded "><a href="components/polygon.html"><strong aria-hidden="true">10.</strong> Polygon</a></li><li class="chapter-item expanded "><a href="components/groundimage.html"><strong aria-hidden="true">11.</strong> GroundImage</a></li><li class="chapter-item expanded affix "><li class="part-title">State Classes</li><li class="chapter-item expanded "><a href="components/mapviewstate.html"><strong aria-hidden="true">12.</strong> MapViewState</a></li><li class="chapter-item expanded "><a href="states/marker-state.html"><strong aria-hidden="true">13.</strong> MarkerState</a></li><li class="chapter-item expanded "><a href="states/circle-state.html"><strong aria-hidden="true">14.</strong> CircleState</a></li><li class="chapter-item expanded "><a href="states/polyline-state.html"><strong aria-hidden="true">15.</strong> PolylineState</a></li><li class="chapter-item expanded "><a href="states/polygon-state.html"><strong aria-hidden="true">16.</strong> PolygonState</a></li><li class="chapter-item expanded "><a href="states/groundimage-state.html"><strong aria-hidden="true">17.</strong> GroundImageState</a></li><li class="chapter-item expanded affix "><li class="part-title">Core Classes</li><li class="chapter-item expanded "><a href="core/geopoint.html"><strong aria-hidden="true">18.</strong> GeoPoint</a></li><li class="chapter-item expanded "><a href="core/georectbounds.html"><strong aria-hidden="true">19.</strong> GeoRectBounds</a></li><li class="chapter-item expanded "><a href="core/mapcameraposition.html"><strong aria-hidden="true">20.</strong> MapCameraPosition</a></li><li class="chapter-item expanded "><a href="core/spherical-utilities.html"><strong aria-hidden="true">21.</strong> Spherical Utilities</a></li><li class="chapter-item expanded "><a href="core/mapviewholder.html"><strong aria-hidden="true">22.</strong> MapViewHolder</a></li><li class="chapter-item expanded "><a href="core/zoom-levels.html"><strong aria-hidden="true">23.</strong> Zoom Levels</a></li><li class="chapter-item expanded "><a href="core/marker-icons.html"><strong aria-hidden="true">24.</strong> Marker Icons</a></li><li class="chapter-item expanded "><a href="core/marker-animation.html"><strong aria-hidden="true">25.</strong> Marker Animation</a></li><li class="chapter-item expanded affix "><li class="part-title">Experimental Modules</li><li class="chapter-item expanded "><a href="experimental/icons.html"><strong aria-hidden="true">26.</strong> Icons</a></li><li class="chapter-item expanded "><a href="experimental/marker-strategy.html"><strong aria-hidden="true">27.</strong> Marker Strategy</a></li><li class="chapter-item expanded "><a href="experimental/marker-native-strategy.html"><strong aria-hidden="true">28.</strong> Marker Native Strategy</a></li><li class="chapter-item expanded affix "><li class="part-title">Examples</li><li class="chapter-item expanded "><a href="examples/basic-usage.html"><strong aria-hidden="true">29.</strong> Basic Usage Examples</a></li><li class="chapter-item expanded "><a href="examples/advanced-usage.html"><strong aria-hidden="true">30.</strong> Advanced Examples</a></li><li class="chapter-item expanded affix "><li class="part-title">API Reference</li><li class="chapter-item expanded "><a href="api/event-handlers.html"><strong aria-hidden="true">31.</strong> Event Handlers</a></li><li class="chapter-item expanded "><a href="api/initialization.html"><strong aria-hidden="true">32.</strong> Initialization</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
