<svelte:head>
	<title>Fordon - OAuth</title>
</svelte:head>

<div class="row vh-100">
	<div class="col-6">
		<div class="row h-100 p-4">
			<div class="col">
				<span class="text-primary">
					<i class="bi bi-circle-fill align-middle" style="font-size: 0.5rem;" />
					Fordon
				</span>
			</div>

			<div class="w-100" />

			<div class="col">
				<div class="row justify-content-center">
					<div class="col-6">
						<slot />
					</div>
				</div>
			</div>

			<div class="w-100" />
		</div>
	</div>

	<div class="col-6 bg-light" />
</div>
