import {useColorStore} from "@/store/ColorStore";
import {computed} from "vue";




export function useBannerStyle(isImageLoaded:any) {
    const colorStore = useColorStore();

    const bannerStyle = computed(() => ({
        background: `linear-gradient(to right, ${colorStore.dominantColorRGB}, rgba(0, 0, 0, 0.4))`,
        borderBottom: `1px solid ${colorStore.dominantColorRGB}`,
        opacity: isImageLoaded.value ? 1 : 0.6,
    }));

    return { bannerStyle };
}