export interface ICards {
    id: string,
    name: string,
    text: string,
}

export interface ICardsStatus{
    list: ICards[],
    loading: boolean,
    error: string | null
}