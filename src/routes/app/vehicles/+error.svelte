<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="row justify-content-center">
	<div class="col-4">
		<div class="alert alert-danger">
			<i class="bi bi-exclamation-octagon-fill me-1" />
			{$page.error?.message}
		</div>
	</div>
</div>
