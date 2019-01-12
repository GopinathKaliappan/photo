
export const kabadi = {
	logos: {
		items: ['jaipur', 'haryana', 'tamil', 'titans', 'puneri', 'telugu', 'patna', 'delhi', 'mumba', 'bengal', 'bulls'],
		jaipur: {
			name: 'Jaipur',
			url: 'assets/imgs/logos/kabadi/jaipur.png'
		},		
		haryana: {
			name: 'Haryana',
			url: 'assets/imgs/logos/kabadi/haryana.png'
		},		
		tamil: {
			name: 'Thamiz Thalaivas',
			url: 'assets/imgs/logos/kabadi/tamil.png'
		},		
		titans: {
			name: 'Titans',
			url: 'assets/imgs/logos/kabadi/titans.png'
		},		
		puneri: {
			name: 'Puneri Paltans',
			url: 'assets/imgs/logos/kabadi/puneri.png'
		},
		patna: {
			name: 'Patna Pirates',
			url: 'assets/imgs/logos/kabadi/patna.png'
		},
		delhi: {
			name: 'Delhi',
			url: 'assets/imgs/logos/kabadi/delhi.png'
		},
		mumba: {
			name: 'Mumba',
			url: 'assets/imgs/logos/kabadi/mumba.png'
		},
		bengal: {
			name: 'Bengal',
			url: 'assets/imgs/logos/kabadi/bengal.png'
		},
	    bulls: {
			name: 'Bulls',
			url: 'assets/imgs/logos/kabadi/bulls.png'
		},
	}
}

export class LogoService {
    public getLogos():Object {
        return kabadi
    }
}
