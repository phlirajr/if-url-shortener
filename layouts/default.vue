<script lang="ts" setup>
import HomeNavBar from '~/components/HomeNavBar.vue';
import NavBar from '~/components/NavBar.vue';

    const route = useRoute();
    const navBarComponent = computed(() => {
        const component = route.name === 'index' ? HomeNavBar : NavBar;
        console.log(component.name)
        return component
    }) 
        
</script>

<template>
    <div>
        <component :is="navBarComponent" :key="route.name" />
        <slot />
    </div>
</template>