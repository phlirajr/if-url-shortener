<script lang="ts" setup>
import type { Database } from '~/database.types';


const {id} = useRoute().params;

const {data} = useAsyncData(id.toString(), async () => {
    const client = useSupabaseClient<Database>();

    const {data:res, error} = await client
        .from('links')
        .select('*, clicks(*)')
        .eq('ifsk', id.toString())
        .single();
    return res;
})

</script>


<template>
    <div class="mt-20">
        {{ data }}
    </div>
</template>