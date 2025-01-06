# Solar System Visualization

An interactive 3D visualization of our solar system built with Three.js and NASA's APIs. View planets, and their orbits, and get detailed information about each celestial body.

## 🌟 Features

- Real-time 3D rendering of the solar system
- Interactive planet exploration
- NASA's Astronomy Picture of the Day integration
- Detailed information panel for each planet
- Realistic planet textures and orbital mechanics
- Responsive design for all screen sizes

## 🚀 Live Demo

[View Live Demo](https://sai-vishwas-space-visualizer.netlify.app/)

## 🛠️ Technologies Used

- Three.js
- NASA APIs
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

## ⚙️ Installation

1. Clone the repository:
```
git clone https://github.com/your-username/space-visualization.git
```

2. Navigate to the project directory:
```
cd space-visualization
```
3. Install dependencies:
```
npm install
```
4. Create a `.env` file in the root directory and add your NASA API key:
```
VITE_NASA_API_KEY=your_api_key_here
```
5. Start the development server:
```
npm run dev
```
## 🎮 Usage

- **Orbit View**: Click and drag to orbit around the solar system
- **Zoom**: Use the scroll wheel to zoom in/out
- **Planet Information**: Click on any planet to view detailed information
- **APOD**: View NASA's Astronomy Picture of the Day in the left panel

## 📁 Project Structure
```
space-visualization/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── styles.css
└── src/
    └── app.js
```

## 🔑 API Keys

This project uses NASA's APIs. Get your API key from:
- [NASA API Portal](https://api.nasa.gov/)

## 🎨 Planet Textures

Planet textures are sourced from:
- Mercury: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7q_NoC49WiU1JYZAZdMEHD5sl_Bli3TiOw&s
- Venus: https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a914cfe7-dc0e-4514-a4cd-9e613759b5c5/dhginpx-1b8d4594-de39-46fe-bcc7-c850ccd159cb.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E5MTRjZmU3LWRjMGUtNDUxNC1hNGNkLTllNjEzNzU5YjVjNVwvZGhnaW5weC0xYjhkNDU5NC1kZTM5LTQ2ZmUtYmNjNy1jODUwY2NkMTU5Y2IuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.JosD1N6PWJ8SioTSXVq96PDf31G6PLmOW-C3l1Cu1oE
- Earth: https://media.istockphoto.com/id/172208211/photo/earth-map-with-clouds.jpg?s=612x612&w=0&k=20&c=zG2Kh28E2UiW_GdlhE75McrrEFSpH8OGuJKI4zcZW9I=
- Mars: https://t3.ftcdn.net/jpg/06/96/83/32/360_F_696833251_1ahM6zJxrkzigXzDG4bpDXzaaCZ9Yzco.jpg
- Jupiter: https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a914cfe7-dc0e-4514-a4cd-9e613759b5c5/dhwa53z-b4f134c0-083f-4e5a-98a7-ccb0c287f488.jpg/v1/fill/w_1024,h_512,q_75,strp/jupiter_texture_by_planetmapmaker_dhwa53z-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvYTkxNGNmZTctZGMwZS00NTE0LWE0Y2QtOWU2MTM3NTliNWM1XC9kaHdhNTN6LWI0ZjEzNGMwLTA4M2YtNGU1YS05OGE3LWNjYjBjMjg3ZjQ4OC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.x5KkIvqHBHBT2qNQ4RTMPespqlTNtJRRkbv0pV3FqCs
- Sun: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7VwyE5iw-iGoEvUj9BV5mnCSpmUi-By-42Q&s

## 📁 Required Files

### index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Data Visualization</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background: #000;
        }
        #search-container {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
        }
        #search-input {
            padding: 10px;
            width: 300px;
            border-radius: 20px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }
        #canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="search-container">
        <input type="text" id="search-input" placeholder="Search celestial objects...">
    </div>
    <div id="canvas-container"></div>
    <script type="module" src="/src/app.js"></script>
</body>
</html>
```
### package.json
```
{
  "name": "space-visualization",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "three": "^0.154.0"
  },
  "devDependencies": {
    "vite": "^4.4.0"
  }
}

### vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    minify: true,
    chunks: true,
    sourcemap: false
  }
})
```
## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
git checkout -b feature/AmazingFeature

3. Commit your changes:
git commit -m 'Add some AmazingFeature'

4. Push to the branch:
git push origin feature/AmazingFeature

5. Open a Pull Request

## 📝 License

MIT License

Copyright (c) [2024] [G Sai Vishwas]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🚀 Future Enhancements

- [ ] Add more planets (Saturn, Uranus, Neptune)
- [ ] Implement planet moons
- [ ] Add asteroid belt visualization
- [ ] Include space missions data
- [ ] Add planetary atmosphere effects
- [ ] Implement time controls for orbital periods

## 📧 Contact

G Sai Vishwas

Project Link: [https://github.com/G-SaiVishwas/Space-Visualization](https://github.com/G-SaiVishwas/Space-Visualization)

## 🌟 Deployment

This project is deployed using Netlify. To deploy your own version:

1. Push your code to GitHub
2. Sign up for Netlify
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: npm run build
   - Publish directory: dist
5. Add environment variables in Netlify:
   - VITE_NASA_API_KEY: Your NASA API key

## 🛠️ Troubleshooting

If you encounter any issues:

1. Check the console for errors
2. Verify all dependencies are installed
3. Ensure NASA API key is valid
4. Check if texture URLs are accessible
5. Clear browser cache
6. Try a different browser

---
Made with ❤️ by Sai Vishwas
