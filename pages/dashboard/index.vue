<script lang="ts" setup>
import LinkForm from '~/components/LinkForm.vue';
import type { Database } from '~/database.types';

    definePageMeta({
        middleware:"auth"
    });

const client = useSupabaseClient<Database>();
const {data, refresh } = useAsyncData('links', async () => {

    const {data,error} = await client
        .from('links')
        .select('*')
    return data;
})
// console.log(data);

</script>

<template>
    <main class="pt-28">
        <section class="container">
            <h1 class="text-4xl font-bold text-delft.blue uppercase">Dashboard</h1>
        </section>
        <section class="container mt-10">
            <LinkForm @created="refresh"/>
        </section>
        <section class="container mt-10">
            <LinkItem
                v-for="link in data"
                :key="link.id"
                :link="{
                    ifsk:link.ifsk,
                    url: link.original_url || '',
                    id: link.id,
                    total_clicks: link.total_clicks || 0,
                }"/>
        </section>
    </main>
</template>