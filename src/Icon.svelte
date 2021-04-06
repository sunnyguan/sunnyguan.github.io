<script>
  export let filename;
  export let url;
</script>

<a href={url} target="_blank" rel="noopener noreferrer" class="w-6 h-6">
  <img width="24" height="24" src={filename} alt="pdf icon" />
</a>