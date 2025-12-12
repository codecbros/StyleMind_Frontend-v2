import heroImage from '@/assets/images/WardrobeHome.jpg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Palette, Shirt, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GITHUB_REPO_URL, PATHS } from '../constants/paths';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border bg-muted/50 text-xs sm:text-sm">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Potenciado por Inteligencia Artificial</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Tu guardaropa digital
              <br />
              <span className="text-primary">con estilo inteligente</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4">
              Organiza tu ropa, genera outfits con IA y descubre combinaciones
              perfectas adaptadas a tu estilo personal
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <Button asChild size="lg" className="text-base h-11 sm:h-12">
                <Link to={PATHS.Register}>Comenzar Gratis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base h-11 sm:h-12 bg-transparent"
              >
                <Link
                  to={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Ver en GitHub
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-12 sm:mt-16 md:mt-20">
            <div className="relative rounded-xl overflow-hidden border shadow-2xl bg-muted aspect-video">
              <img
                src={heroImage}
                alt="App preview showing wardrobe organization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Todo lo que necesitas para lucir bien
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas potentes para gestionar tu estilo personal
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shirt className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  Guardaropa Digital
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Digitaliza tu ropa con fotos, categorías, colores y detalles.
                  Ten tu closet siempre a mano.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  Outfits con IA
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Genera combinaciones personalizadas según la ocasión, clima y
                  tu estilo único.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  Análisis de Estilo
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Recibe recomendaciones basadas en tu perfil, colores que te
                  favorecen y tu tipo de cuerpo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Cómo funciona
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Tres simples pasos para transformar tu estilo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold">
                  1
                </div>
                <div className="aspect-square w-full max-w-xs rounded-lg overflow-hidden border shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop"
                    alt="Upload your clothes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Sube tus prendas
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Fotografía tu ropa y añade detalles como categoría, color,
                    talla y material
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold">
                  2
                </div>
                <div className="aspect-square w-full max-w-xs rounded-lg overflow-hidden border shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop"
                    alt="Organize your wardrobe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Organiza tu guardaropa
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Filtra por categoría, temporada, color y encuentra
                    rápidamente lo que buscas
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl sm:text-3xl font-bold">
                  3
                </div>
                <div className="aspect-square w-full max-w-xs rounded-lg overflow-hidden border shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop"
                    alt="Generate AI outfits"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Genera outfits con IA
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Deja que la IA cree combinaciones perfectas adaptadas a
                    cualquier ocasión
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Comienza a vestir mejor hoy
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-balance">
            Únete a StyleMind y transforma la forma en que organizas tu ropa y
            creas tus looks
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base h-11 sm:h-12"
            >
              <Link to={PATHS.Register}>
                <Zap className="mr-2 h-5 w-5" />
                Crear Cuenta Gratis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shirt className="h-6 w-6" />
                <span className="text-xl font-bold">StyleMind</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tu asistente personal de moda impulsado por IA. Organiza,
                combina y luce increíble cada día.
              </p>
            </div>

            {/* Creators */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Creadores</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <img
                      src="https://avatars.githubusercontent.com/u/114698652"
                      alt="Josue Garces Jouvin"
                      className="size-8 rounded-full"
                    />
                  </div>
                  <Link
                    to="https://github.com/josueJouvin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="font-medium">Josue Garces Jouvin</p>
                    <p className="text-xs text-muted-foreground">
                      Frontend Developer
                    </p>
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <img
                      src="https://avatars.githubusercontent.com/u/66442822"
                      alt="Ivan Manzaba"
                      className="size-8 rounded-full"
                    />
                  </div>
                  <Link
                    to="https://github.com/IvanM9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="font-medium">Ivan Manzaba</p>
                    <p className="text-xs text-muted-foreground">
                      Backend Developer
                    </p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Proyecto</h3>
              <div className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                >
                  <Link
                    to={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Ver en GitHub
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Proyecto de código abierto. Contribuciones bienvenidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
