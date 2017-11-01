<template>
  <div>
    <RegForm/>
  </div>
</template>

<script>
export default {
  name: 'FileViewer',
  components: {
    RegForm: () => import('@/components/AWSRegForm')
  }
}
</script>
