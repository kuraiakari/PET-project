> Final first step of project

> > Created function base of models user, store and product

> > - creating an account for buyers,
> > - evaluation of goods (rating and comment),
> > - Shopping,
> > - adding or removing products from the list of favorites,
> > - search for products by name and category,
> > - sorting products by rating or discount,
> > - view cart history,
> > - viewing and changing personal information,
> > - browsing the store and adding new products,
> > - viewing a list of favorite products,
> > - change of product information or deletion.

> Move next step of the project

> > Create fuction real-time

> > - notifications for owners shop when have people buy products of them

> > Improve peformance of the project

> > - for sidebar

> > RefreshToken and AccessToken

> > > Was build refresh token and access token but have error. SetInterval in FE not synchronized expiresIn accessToken so the case where the access token has expired but is not newly created. Leads to other functions using the old accessToken. Received an expired token error(Example: reload page, setInterval was clear and not update access token)


>> loi dang ki tai khoan