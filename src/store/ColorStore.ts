// src/stores/colorStore.ts
import { defineStore } from 'pinia'
import ColorThief from 'colorthief'




export const useColorStore = defineStore('color', {
    state: () => ({
        dominantColorRGB: 'rgb(0, 0, 0)',
    }),

    actions: {
        async extractDominantColor(imageUrl: string) {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous'; // Important pour éviter les problèmes de canvas "tainted"

                const timeout = setTimeout(() => {
                    console.warn('Timeout : image non chargée dans le délai');
                    this.dominantColorRGB = 'rgb(32, 40, 49)';
                    resolve(this.dominantColorRGB);
                }, 5000); // timeout de 5s

                img.onload = () => {
                    clearTimeout(timeout);
                    try {
                        const colorThief = new ColorThief();
                        const color = colorThief.getColor(img);
                        const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                        this.dominantColorRGB = rgbColor;
                        resolve(rgbColor);
                    } catch (err) {
                        console.error('Erreur ColorThief:', err);
                        this.dominantColorRGB = 'rgb(32, 40, 49)';
                        resolve(this.dominantColorRGB);
                    }
                };

                img.onerror = (e) => {
                    clearTimeout(timeout);
                    console.error('Erreur chargement image:', e);
                    this.dominantColorRGB = 'rgb(32, 40, 49)';
                    resolve(this.dominantColorRGB);
                };

                img.src = imageUrl;
            });
        }
    }
});