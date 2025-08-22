import {computed, Ref, ref} from "vue";

export function useBiogra(biographie: Ref<string>, limit = 300) {
    const isExpanded = ref(false);

    const truncateBio = computed(() => {
        const text = biographie.value || '';

        if (isExpanded.value || text.length <= limit) {
            return text;
        }

        return text.slice(0, limit) + '...';
    });

    const toggleExpanded = () => {
        isExpanded.value = !isExpanded.value;
    };

    return { truncateBio, toggleExpanded, isExpanded };
}