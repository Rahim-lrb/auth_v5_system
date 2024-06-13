import { Header } from "./header"
import { BackButton } from "./back-button"
import { CardFooter, CardHeader, Card } from "../ui/card"

export const ErrorCard = () => {

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Oops! something is wrong"></Header>
            </CardHeader>
            <CardFooter>
                <BackButton label="back to login" href="/auth/login"></BackButton>
            </CardFooter>
        </Card>
    )
}
