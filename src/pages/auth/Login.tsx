import authImage from '@/assets/images/authImg.jpg';
import LoginForm from '../../components/auth/LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

export default function Login() {
  return (
    <>
      <section className="lg:col-span-1 2xl:col-span-3 mx-auto hidden lg:block ">
        <img
          src={authImage}
          alt="Auth image"
          width={3000}
          height={2000}
          className="object-cover transition-all duration-300 rounded-lg hover:grayscale opacity-90 dark:opacity-75"
        />
      </section>
      <section className="mx-auto w-full lg:col-span-1 2xl:col-span-2">
        <Card className="border border-muted-foreground shadow-xl">
          <CardHeader>
            <CardTitle
              className={`font-extrabold text-center leading-7 md:text-start uppercase`}
            >
              ¡Bienvenido de nuevo!
            </CardTitle>
            <div className="space-y-1 pt-2">
              <CardDescription>
                Ingresa a tu cuenta para descubrir nuevas combinaciones
              </CardDescription>
              <CardDescription className="text-sm text-muted-foreground">
                Accede a tus outfits personalizados y recomendaciones de IA
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
