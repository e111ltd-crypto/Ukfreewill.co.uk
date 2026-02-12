# UK Free Will Generator

A secure, client-side React application for generating legally valid wills for England & Wales.

## Hosting Instructions (Fasthosts / Static Hosting)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```
   This will create a `build` folder.

3. **Upload**
   Upload the contents of the `build` folder to your `public_html` or `htdocs` folder on your hosting provider.

4. **Routing**
   If using Apache (common on shared hosting), ensure the included `.htaccess` file is uploaded to handle page routing.

## Development

- `npm start`: Runs the app in development mode.
- `npm run server`: Runs the optional backend (requires Node.js hosting).
