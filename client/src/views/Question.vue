<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import AddQuestion from './AddQuestion'
import QuestionDetail from './QuestionDetail'

export default {
  components: {
    AddQuestion,
    QuestionDetail
  }
}

</script>
