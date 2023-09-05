import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

const Footer = observer(() => {
    return (
        <footer class="footer">
          <section class="p-3">
                <div class="container text-center text-md-start mt-4">
                    <div class="row mt-3">
                        <div class="col-md-5 col-lg-4 col-xl-5 mx-auto mb-4">
                            <h6 class="text-uppercase mb-4">
                                <i class="fas fa-gem me-3"></i><div class="footer-title">Парник</div>
                            </h6>
                            <p>
                                Оранжерея с видом на Кремль.
                                Мастер-классы, фотосессии, продажа цветов и декора!
                                Атмосфера и гамак
                            </p>
                        </div>

                        <div class="col-md-4 mx-auto mb-md-0 mb-4">
                            <div class="info-title"><h6 class="text-uppercase mb-2">Обратная связь</h6></div>
                            <p class="mb-2">Нижний Новгород, ул. Летняя, 666, Россия</p>
                            <p class="mb-2">info@example.com</p>
                            <p class="mb-2">+ 7 234 567 88</p>
                            <p class="mb-2">+ 7 234 567 89</p>
                        </div>
                    </div>
                </div>
          </section>
            <div class="text-center p-3">
                © 2023 
            </div>
        </footer>
    );
});

export default Footer;