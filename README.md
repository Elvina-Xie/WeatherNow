# WeatherNow - Smart Weather Dashboard

**Abstract:** WeatherNow is a static, responsive weather dashboard (HTML, CSS, vanilla JavaScript) using the free Open-Meteo API. It is served by Nginx in Docker, built by a Jenkins pipeline from a GitHub repository, and planned with Trello.

**Problem statement:** Students need a small but complete project that shows the full path from code to a running container using DevOps tools.

**Objectives:** build a live weather site; containerize it; automate checks and image builds; manage work and source code.

## Features
Live search (Open-Meteo), current weather, humidity, wind and direction, UV, sunrise/sunset, local time, 24-hour and 5-day forecasts, SVG icons, Leaflet map with a weather risk indicator, precautions for children, pregnant women, outdoor workers, cyclists/pedestrians and elderly people, lifestyle advice (running, car wash, drone, cycling, dining), favorites and recent searches (localStorage), light/dark theme, loading/error/retry handling.

**External dependencies (internet needed):** Open-Meteo APIs, Leaflet 1.9.4 from cdnjs, OpenStreetMap map tiles (optionally Stadia Maps with your own key).

## Map risk rules
Level = highest triggered rule, from current values and today's forecast. **Red:** thunderstorm, wind 60+ km/h, temp 40+ or -10 or lower. **Orange:** wind 40+, temp 36+ or 0 or lower, precipitation chance 70+ or heavy rain/snow codes, UV 11+. **Yellow:** wind 25+, temp 32+ or 5 or lower, precipitation chance 40+, UV 6+, fog. **Green:** none. This is an informational indicator, not an official warning, and the map is not live radar.

## Architecture
Browser -> Nginx container (static files) -> Open-Meteo APIs (called from the browser).
GitHub -> Jenkins (checkout, validate, test, docker build) -> image `weathernow:latest`.

## Run locally with Docker (PowerShell, in the WeatherNow folder)
```
docker build -t weathernow .
docker run -d --name weathernow-container -p 8080:80 weathernow
```
Open http://localhost:8080

| Task | Command |
|---|---|
| Running containers | `docker ps` |
| Logs | `docker logs weathernow-container` |
| Stop / remove | `docker stop weathernow-container` then `docker rm weathernow-container` |
| Name already in use | `docker rm -f weathernow-container`, then run again |
| Rebuild after changes | stop and remove the container, `docker build -t weathernow .`, run again |

## GitHub (website method)
1. Sign up at github.com. 2. New repository named `WeatherNow`, Public. 3. Click "uploading an existing file", drag in all 8 files (not the folder), commit. 4. Check that the files are at the repo root.

## Jenkins setup (Windows)
1. Install Java 17 or 21, then the Jenkins Windows installer (LTS) from jenkins.io. Open http://localhost:8080 (change Jenkins to port 8081 in the installer if you also run the container on 8080; use `-p 8090:80` otherwise).
2. Install the suggested plugins (includes Git and Pipeline).
3. **Docker access:** Jenkins as a Windows service runs as "Local System" and may not reach Docker Desktop. Simplest fix: open `services.msc` -> Jenkins -> Properties -> Log On -> use your own Windows account, restart the service, and keep Docker Desktop running. Security note: Jenkins then runs with your account's rights and can control Docker; use this on a personal demo machine only.
4. Test: Manage Jenkins -> Script console is not needed; create a job and add `bat 'docker version'` if unsure.
5. New Item -> Pipeline -> "Pipeline script from SCM" -> Git -> your repo URL, branch `*/main`, script path `Jenkinsfile` -> Save -> Build Now.

Stages: Checkout Source, Validate Project Files, Test Website, Build Docker Image. The pipeline only builds the image; it does not deploy.

## Trello
Board "WeatherNow - DevOps Project" with lists To Do, In Progress, Testing, Completed. Add the 11 cards (Project Planning ... Prepare Screenshots and Project Report), each with a checklist; drag cards right as work advances. Trello is manual and not connected to Jenkins.

## Test checklist (all Not tested until you run them)
Layout: open at 1920, 1366, 768 and 375 px wide (browser DevTools, Ctrl+Shift+M) and confirm no horizontal scrollbar.
- [ ] Opens at http://localhost:8080 (Docker) and the map tiles load (Network tab: tile requests return 200) - [ ] Desktop and mobile layout fit - [ ] Search "London" loads live data (compare with open-meteo.com)
- [ ] Unknown city "zzzxq" shows an error - [ ] API failure: DevTools > Network > Offline, search, see error + Retry + "last loaded" notice
- [ ] Hourly (24) and five-day forecasts show - [ ] Icons match conditions - [ ] Map shows marker, popup, legend, zoom and drag
- [ ] Risk color and precautions/activities change between cities (try a hot and a cold city) - [ ] Favorites add/remove and persist after refresh
- [ ] Recent searches work - [ ] Theme persists after refresh - [ ] docker build succeeds - [ ] Container serves localhost:8080 - [ ] Jenkins build succeeds

## Map tiles
Default: OpenStreetMap standard tiles. Their policy (https://operations.osmfoundation.org/policies/tiles/) allows light use if the page sends a Referer header and shows attribution. Pages opened as files (file://) cannot send a Referer, so tiles are blocked: always open the site at http://localhost:8080 (Docker) or another http address.
Optional, works from any address: create a free account at https://client.stadiamaps.com/, create a property and copy its API key, then set `const MAP_TILES = { stadiaKey: "YOUR_KEY" };` in `script.js`. Stadia's free plan is for non-commercial use; check their terms. Stadia without a key returned "401 Invalid Authentication" images, so do not use it without a key.
If tiles fail to load, a message with a Retry button appears; a "Reload map tiles" button is always under the map. Providers sometimes return an error picture instead of an HTTP error, so the page cannot always detect that automatically.

## Troubleshooting
Docker not found: start Docker Desktop. Port in use: use `-p 8090:80`. Jenkins "docker is not recognized": fix the service account (above) and restart Jenkins. Weather not loading: check internet.

## Limitations and future work
No backend, metric units only, first city match only. Future: unit toggle, geolocation, optional HTTP check stage, deployment.

## Conclusion
WeatherNow shows how planning, source control, CI and containers fit together in one small project.
