<script>
import './lib/Tailwind.css'
let titulo = 'APREDIENDO A DESARROLLAR VIDEOGAMES'
let texto = 'Phaser 3 es una herramienta de programación, más concretamente, una librería Javascript, creada por Richard Davey, destinada a desarrollar juegos de una forma rápida para navegadores web, válida tanto para versiones de escritorio como móvil, y pueden ser compilados para usarlos y publicarlos como aplicación móvil. El juego se carga en un Canvas o en WebGL.'
</script>
<div class='flex justify-center my-10'>
	<div class='flex flex-col items-center w-[75%] text-xl gap-y-5'>
		<img src="https://phaser.io/images/logo/logo-download-vector.png" alt='fruit' class=''>
		<div class='w-full text-center flex flex-col bg-sky-50 p-4 gap-y-4'>
         <i class='bx bxl-netlify text-5xl text-sky-400'></i>
         <h1 class='text-3xl text-sky-700 font-bold'>{ titulo }</h1>
      </div>
		<p class='text-justify'>{ texto }</p>
	</div>
</div>
<div id='game' class='w-full bg-zinc-100 flex flex-col gap-y-7 items-center justify-center py-20'>
   <h1 class='text-4xl uppercase text-sky-700 font-bold'>videogame</h1>
</div>