export default interface TypedAction<TAction, TPayload> {
	type: TAction;
	payload: TPayload;
}