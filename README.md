
# media-scene

> A simple (as in not complex) media center acting as a scene for your [media-artwork](https://github.com/varl/media-artwork).

## Feature list
- _Local metadata:_ Relies on locally stored, meticulously managed metadata.
- _Fanart centered:_ Pulls locally stored fanart and presents it front and center.
- _Device agnostic:_ Any device can be a media center.
- _Browatch support:_ Have friends connect to your currently playing media and enjoy it together.
- _Multiple users:_ When there is no agreement on what to play.

## Running your project

The generated project includes a live-reloading static server on port `8080` (you can change the port in the `gulpfile.js` config), which will build, launch, and rebuild the app whenever you change application code. To start the server, run:

```bash
$ npm start
```

If you prefer to just build without the live reload and build-on-each-change watcher, run:

```bash
$ npm run build
```

## Generating Additional Code

You can add additional functionality to your application by invoking the subgenerators included in the Flux Generator. You can add components using the following commands:

#### Components
```bash
$ yo flux:component ComponentName
```

#### Actions
```bash
$ yo flux:action ActionCreatorName
```

#### Stores
```bash
$ yo flux:store StoreName
```
