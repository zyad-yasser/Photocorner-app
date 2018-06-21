<template>
  <nav class="navbar-light bg-light border-bottom col-lg-8 mx-auto p-2 fixed-top">
  <div class="container">
  <div class="row mt-3">
    <div class="col col-12">
<form class="form mt-5 col col-12">
      <input class="form-control col col-10 float-left" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-danger rounded-circle ml-1 float-left"><i class="fa fa-search" aria-hidden="true"></i></button>
    </form>

  </div></div></div>
</nav>
</template>

<script>
export default {
  name: 'search',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fa {
  font-size: 15px;
}
</style>
