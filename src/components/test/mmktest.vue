<template>
    <UserRegisterTable />
    <MedicineRegisterTable/>
    <SalesBarChart />
    <MedicineTraceTable />  
    <AdminTable />
    <ProducerForm/>
</template>
<script lang="ts" setup>
import MedicineTraceTable from '../HomeView/MedicineTraceTable.vue';
import SalesBarChart from '../HomeView/SalesBarChart.vue';
import MedicineRegisterTable from '../HomeView/MedicineRegisterTable.vue';
import UserRegisterTable from '../HomeView/UserRegisterTable.vue';
import AdminTable from '../HomeView/AdminTable.vue';
import ProducerForm from '../HomeView/ProducerForm.vue';
</script>