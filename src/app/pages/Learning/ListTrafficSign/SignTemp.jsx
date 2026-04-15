
export default function SignTemp() {


    const listTrafficSign = [
        {
            image: '<img width="300" height="115" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510b-chu-y-duong-sat-300x115.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.510b - Chú ý đường sắt" decoding="async" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510b-chu-y-duong-sat-300x115.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510b-chu-y-duong-sat-1024x391.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510b-chu-y-duong-sat-768x293.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510b-chu-y-duong-sat-1536x587.jpg 1536w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510b-chu-y-duong-sat.jpg 1600w" sizes="(max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.510b – Chú ý đường sắt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-510b-chu-y-duong-sat/" class="sign-link-overlay" title="Biển báo S.510b – Chú ý đường sắt"></a>',
        },
        {
            image: '<img width="262" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510a-chu-y-duong-tron-co-bang-tuyet-262x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.510a - Chú ý đường trơn có băng tuyết" decoding="async" fetchpriority="high" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510a-chu-y-duong-tron-co-bang-tuyet-262x300.jpg 262w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s510a-chu-y-duong-tron-co-bang-tuyet.jpg 339w" sizes="(max-width: 262px) 100vw, 262px" />',
            name_description_code: '<p class="sign-name">Biển báo S.510a – Chú ý đường trơn có băng tuyết</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-510a-chu-y-duong-tron-co-bang-tuyet/" class="sign-link-overlay" title="Biển báo S.510a – Chú ý đường trơn có băng tuyết"></a>',
        },
        {
            image: '<img width="300" height="194" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s508b-bieu-thi-thoi-gian-300x194.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.508b - Biểu thị thời gian" decoding="async" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s508b-bieu-thi-thoi-gian-300x194.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s508b-bieu-thi-thoi-gian.jpg 469w" sizes="(max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.508b – Biểu thị thời gian</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-508b-bieu-thi-thoi-gian/" class="sign-link-overlay" title="Biển báo S.508b – Biểu thị thời gian"></a>',
        },
        {
            image: '<img width="300" height="188" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s509b-thuyet-minh-bien-chinh-300x188.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.509b - Thuyết minh biển chính" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s509b-thuyet-minh-bien-chinh-300x188.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s509b-thuyet-minh-bien-chinh.jpg 336w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.509b – Thuyết minh biển chính</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-509b-thuyet-minh-bien-chinh/" class="sign-link-overlay" title="Biển báo S.509b – Thuyết minh biển chính"></a>',
        },
        {
            image: '<img width="300" height="100" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-sg7-bien-chi-dan-toi-dia-diem-cam-trai-300x100.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.G,7 - Biển chỉ dẫn tới địa điểm cắm trại" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-sg7-bien-chi-dan-toi-dia-diem-cam-trai-300x100.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-sg7-bien-chi-dan-toi-dia-diem-cam-trai.jpg 496w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.G,7 – Biển chỉ dẫn tới địa điểm cắm trại</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-g7-bien-chi-dan-toi-dia-diem-cam-trai/" class="sign-link-overlay" title="Biển báo S.G,7 – Biển chỉ dẫn tới địa điểm cắm trại"></a>',
        },
        {
            image: '<img width="292" height="292" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s509a-thuyet-minh-bien-chinh.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.509a - Thuyết minh biển chính" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s509a-thuyet-minh-bien-chinh.jpg 292w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s509a-thuyet-minh-bien-chinh-150x150.jpg 150w" sizes="auto, (max-width: 292px) 100vw, 292px" />',
            name_description_code: '<p class="sign-name">Biển báo S.509a – Thuyết minh biển chính</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-509a-thuyet-minh-bien-chinh/" class="sign-link-overlay" title="Biển báo S.509a – Thuyết minh biển chính"></a>',
        },
        {
            image: '<img width="300" height="101" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-sg8-bien-chi-dan-toi-nha-tro-300x101.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.G,8 - Biển chỉ dẫn tới nhà trọ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-sg8-bien-chi-dan-toi-nha-tro-300x101.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-sg8-bien-chi-dan-toi-nha-tro.jpg 495w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.G,8 – Biển chỉ dẫn tới nhà trọ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-g8-bien-chi-dan-toi-nha-tro/" class="sign-link-overlay" title="Biển báo S.G,8 – Biển chỉ dẫn tới nhà trọ"></a>',
        },
        {
            image: '<img width="300" height="78" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s507-huong-re-300x78.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.507 - Hướng rẽ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s507-huong-re-300x78.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s507-huong-re.jpg 538w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.507 – Hướng rẽ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-507-huong-re/" class="sign-link-overlay" title="Biển báo S.507 – Hướng rẽ"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506a-huong-duong-uu-tien-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.506a - Hướng đường ưu tiên" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506a-huong-duong-uu-tien-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506a-huong-duong-uu-tien-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506a-huong-duong-uu-tien.jpg 347w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.506a – Hướng đường ưu tiên</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-506a-huong-duong-uu-tien/" class="sign-link-overlay" title="Biển báo S.506a – Hướng đường ưu tiên"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506b-huong-duong-uu-tien-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo S.506b - Hướng đường ưu tiên" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506b-huong-duong-uu-tien-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506b-huong-duong-uu-tien-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-s506b-huong-duong-uu-tien.jpg 347w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo S.506b – Hướng đường ưu tiên</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-s-506b-huong-duong-uu-tien/" class="sign-link-overlay" title="Biển báo S.506b – Hướng đường ưu tiên"></a>',
        },
        {
            image: '<img width="300" height="89" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444e-bien-bao-chi-dan-dia-diem-300x89.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.444e - Biển báo chỉ dẫn địa điểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444e-bien-bao-chi-dan-dia-diem-300x89.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444e-bien-bao-chi-dan-dia-diem-768x228.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444e-bien-bao-chi-dan-dia-diem.jpg 800w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.444e – Biển báo chỉ dẫn địa điểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-444e-bien-bao-chi-dan-dia-diem/" class="sign-link-overlay" title="Biển báo I.444e – Biển báo chỉ dẫn địa điểm"></a>',
        },
        {
            image: '<img width="300" height="90" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444d-bien-bao-chi-dan-dia-diem-300x90.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.444d - Biển báo chỉ dẫn địa điểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444d-bien-bao-chi-dan-dia-diem-300x90.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444d-bien-bao-chi-dan-dia-diem.jpg 714w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.444d – Biển báo chỉ dẫn địa điểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-444d-bien-bao-chi-dan-dia-diem/" class="sign-link-overlay" title="Biển báo I.444d – Biển báo chỉ dẫn địa điểm"></a>',
        },
        {
            image: '<img width="300" height="94" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444c-bien-bao-chi-dan-dia-diem-300x94.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.444c - Biển báo chỉ dẫn địa điểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444c-bien-bao-chi-dan-dia-diem-300x94.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444c-bien-bao-chi-dan-dia-diem.jpg 690w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.444c – Biển báo chỉ dẫn địa điểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-444c-bien-bao-chi-dan-dia-diem/" class="sign-link-overlay" title="Biển báo I.444c – Biển báo chỉ dẫn địa điểm"></a>',
        },
        {
            image: '<img width="300" height="102" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444b-bien-bao-chi-dan-dia-diem-300x102.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.444b - Biển báo chỉ dẫn địa điểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444b-bien-bao-chi-dan-dia-diem-300x102.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444b-bien-bao-chi-dan-dia-diem.jpg 592w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.444b – Biển báo chỉ dẫn địa điểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-444b-bien-bao-chi-dan-dia-diem/" class="sign-link-overlay" title="Biển báo I.444b – Biển báo chỉ dẫn địa điểm"></a>',
        },
        {
            image: '<img width="300" height="90" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444a-bien-bao-chi-dan-dia-diem-300x90.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.444a - Biển báo chỉ dẫn địa điểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444a-bien-bao-chi-dan-dia-diem-300x90.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i444a-bien-bao-chi-dan-dia-diem.jpg 545w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.444a – Biển báo chỉ dẫn địa điểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-444a-bien-bao-chi-dan-dia-diem/" class="sign-link-overlay" title="Biển báo I.444a – Biển báo chỉ dẫn địa điểm"></a>',
        },
        {
            image: '<img width="245" height="242" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i443-xe-keo-ro-mooc.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.443 - Xe kéo rơ-moóc" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">moóc</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-443-xe-keo-ro-mooc/" class="sign-link-overlay" title="Biển báo I.443 – Xe kéo rơ-moóc"></a>',
        },
        {
            image: '<img width="300" height="295" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i442-cho-300x295.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.442 - Chợ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i442-cho-300x295.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i442-cho.jpg 309w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.442 – Chợ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-442-cho/" class="sign-link-overlay" title="Biển báo I.442 – Chợ"></a>',
        },
        {
            image: '<img width="231" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441c-bao-hieu-phia-truoc-co-cong-truong-thi-cong-231x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.441c - Báo hiệu phía trước có công trường thi công" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441c-bao-hieu-phia-truoc-co-cong-truong-thi-cong-231x300.jpg 231w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441c-bao-hieu-phia-truoc-co-cong-truong-thi-cong.jpg 349w" sizes="auto, (max-width: 231px) 100vw, 231px" />',
            name_description_code: '<p class="sign-name">Biển báo I.441c – Báo hiệu phía trước có công trường thi công</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-441c-bao-hieu-phia-truoc-co-cong-truong-thi-cong/" class="sign-link-overlay" title="Biển báo I.441c – Báo hiệu phía trước có công trường thi công"></a>',
        },
        {
            image: '<img width="231" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441b-bao-hieu-phia-truoc-co-cong-truong-thi-cong-231x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.441b - Báo hiệu phía trước có công trường thi công" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441b-bao-hieu-phia-truoc-co-cong-truong-thi-cong-231x300.jpg 231w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441b-bao-hieu-phia-truoc-co-cong-truong-thi-cong.jpg 344w" sizes="auto, (max-width: 231px) 100vw, 231px" />',
            name_description_code: '<p class="sign-name">Biển báo I.441b – Báo hiệu phía trước có công trường thi công</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-441b-bao-hieu-phia-truoc-co-cong-truong-thi-cong/" class="sign-link-overlay" title="Biển báo I.441b – Báo hiệu phía trước có công trường thi công"></a>',
        },
        {
            image: '<img width="232" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441a-bao-hieu-phia-truoc-co-cong-truong-thi-cong-232x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.441a - Báo hiệu phía trước có công trường thi công" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441a-bao-hieu-phia-truoc-co-cong-truong-thi-cong-232x300.jpg 232w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i441a-bao-hieu-phia-truoc-co-cong-truong-thi-cong.jpg 342w" sizes="auto, (max-width: 232px) 100vw, 232px" />',
            name_description_code: '<p class="sign-name">Biển báo I.441a – Báo hiệu phía trước có công trường thi công</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-441a-bao-hieu-phia-truoc-co-cong-truong-thi-cong/" class="sign-link-overlay" title="Biển báo I.441a – Báo hiệu phía trước có công trường thi công"></a>',
        },
        {
            image: '<img width="300" height="117" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i440-duong-dang-thi-cong-300x117.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.440 - Đường đang thi công" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i440-duong-dang-thi-cong-300x117.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i440-duong-dang-thi-cong.jpg 560w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.440 – Đường đang thi công</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-440-duong-dang-thi-cong/" class="sign-link-overlay" title="Biển báo I.440 – Đường đang thi công"></a>',
        },
        {
            image: '<img width="300" height="151" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i439-ten-cau-300x151.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.439 - Tên cầu" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i439-ten-cau-300x151.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i439-ten-cau.jpg 416w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.439 – Tên cầu</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-439-ten-cau/" class="sign-link-overlay" title="Biển báo I.439 – Tên cầu"></a>',
        },
        {
            image: '<img width="210" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i437-duong-cao-toc-210x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.437 - Đường cao tốc" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i437-duong-cao-toc-210x300.jpg 210w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i437-duong-cao-toc.jpg 358w" sizes="auto, (max-width: 210px) 100vw, 210px" />',
            name_description_code: '<p class="sign-name">Biển báo I.437 – Đường cao tốc</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-437-duong-cao-toc/" class="sign-link-overlay" title="Biển báo I.437 – Đường cao tốc"></a>',
        },
        {
            image: '<img width="229" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i436-tram-canh-sat-giao-thong-229x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.436 - Trạm cảnh sát giao thông" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i436-tram-canh-sat-giao-thong-229x300.jpg 229w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i436-tram-canh-sat-giao-thong.jpg 328w" sizes="auto, (max-width: 229px) 100vw, 229px" />',
            name_description_code: '<p class="sign-name">Biển báo I.436 – Trạm cảnh sát giao thông</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-436-tram-canh-sat-giao-thong/" class="sign-link-overlay" title="Biển báo I.436 – Trạm cảnh sát giao thông"></a>',
        },
        {
            image: '<img width="221" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i435-ben-xe-dien-221x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.435 - Bến xe điện" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i435-ben-xe-dien-221x300.jpg 221w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i435-ben-xe-dien.jpg 423w" sizes="auto, (max-width: 221px) 100vw, 221px" />',
            name_description_code: '<p class="sign-name">Biển báo I.435 – Bến xe điện</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-435-ben-xe-dien/" class="sign-link-overlay" title="Biển báo I.435 – Bến xe điện"></a>',
        },
        {
            image: '<img width="201" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i434b-ben-xe-tai-201x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.434b - Bến xe tải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i434b-ben-xe-tai-201x300.jpg 201w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i434b-ben-xe-tai.jpg 339w" sizes="auto, (max-width: 201px) 100vw, 201px" />',
            name_description_code: '<p class="sign-name">Biển báo I.434b – Bến xe tải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-434b-ben-xe-tai/" class="sign-link-overlay" title="Biển báo I.434b – Bến xe tải"></a>',
        },
        {
            image: '<img width="216" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i434a-ben-xe-buyt-216x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.434a - Bến xe buýt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i434a-ben-xe-buyt-216x300.jpg 216w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i434a-ben-xe-buyt.jpg 411w" sizes="auto, (max-width: 216px) 100vw, 216px" />',
            name_description_code: '<p class="sign-name">Biển báo I.434a – Bến xe buýt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-434a-ben-xe-buyt/" class="sign-link-overlay" title="Biển báo I.434a – Bến xe buýt"></a>',
        },
        {
            image: '<img width="228" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433e-bao-hieu-nha-tro-youth-hostel-228x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.433e - Báo hiệu nhà trọ (Youth Hostel)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433e-bao-hieu-nha-tro-youth-hostel-228x300.jpg 228w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433e-bao-hieu-nha-tro-youth-hostel.jpg 308w" sizes="auto, (max-width: 228px) 100vw, 228px" />',
            name_description_code: '<p class="sign-name">Biển báo I.433e – Báo hiệu nhà trọ (Youth Hostel)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-433e-bao-hieu-nha-tro-youth-hostel/" class="sign-link-overlay" title="Biển báo I.433e – Báo hiệu nhà trọ (Youth Hostel)"></a>',
        },
        {
            image: '<img width="228" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433d-bao-hieu-noi-cam-trai-nha-nghi-luu-dong-228x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.433d - Báo hiệu nơi cắm trại, nhà nghỉ lưu động" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433d-bao-hieu-noi-cam-trai-nha-nghi-luu-dong-228x300.jpg 228w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433d-bao-hieu-noi-cam-trai-nha-nghi-luu-dong.jpg 233w" sizes="auto, (max-width: 228px) 100vw, 228px" />',
            name_description_code: '<p class="sign-name">Biển báo I.433d – Báo hiệu nơi cắm trại, nhà nghỉ lưu động</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-433d-bao-hieu-noi-cam-trai-nha-nghi-luu-dong/" class="sign-link-overlay" title="Biển báo I.433d – Báo hiệu nơi cắm trại, nhà nghỉ lưu động"></a>',
        },
        {
            image: '<img width="224" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433c-bao-hieu-noi-cam-trai-nha-nghi-luu-dong-224x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.433c - Báo hiệu nơi cắm trại, nhà nghỉ lưu động" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433c-bao-hieu-noi-cam-trai-nha-nghi-luu-dong-224x300.jpg 224w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433c-bao-hieu-noi-cam-trai-nha-nghi-luu-dong.jpg 244w" sizes="auto, (max-width: 224px) 100vw, 224px" />',
            name_description_code: '<p class="sign-name">Biển báo I.433c – Báo hiệu nơi cắm trại, nhà nghỉ lưu động</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-433c-bao-hieu-noi-cam-trai-nha-nghi-luu-dong/" class="sign-link-overlay" title="Biển báo I.433c – Báo hiệu nơi cắm trại, nhà nghỉ lưu động"></a>',
        },
        {
            image: '<img width="227" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433b-bao-hieu-noi-cam-trai-nha-nghi-luu-dong-227x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.433b - Báo hiệu nơi cắm trại, nhà nghỉ lưu động" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433b-bao-hieu-noi-cam-trai-nha-nghi-luu-dong-227x300.jpg 227w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433b-bao-hieu-noi-cam-trai-nha-nghi-luu-dong.jpg 246w" sizes="auto, (max-width: 227px) 100vw, 227px" />',
            name_description_code: '<p class="sign-name">Biển báo I.433b – Báo hiệu nơi cắm trại, nhà nghỉ lưu động</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-433b-bao-hieu-noi-cam-trai-nha-nghi-luu-dong/" class="sign-link-overlay" title="Biển báo I.433b – Báo hiệu nơi cắm trại, nhà nghỉ lưu động"></a>',
        },
        {
            image: '<img width="201" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433a-noi-nghi-mat-201x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.433a - Nơi nghỉ mát" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433a-noi-nghi-mat-201x300.jpg 201w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i433a-noi-nghi-mat.jpg 271w" sizes="auto, (max-width: 201px) 100vw, 201px" />',
            name_description_code: '<p class="sign-name">Biển báo I.433a – Nơi nghỉ mát</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-433a-noi-nghi-mat/" class="sign-link-overlay" title="Biển báo I.433a – Nơi nghỉ mát"></a>',
        },
        {
            image: '<img width="201" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i432-khach-san-201x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.432 - Khách sạn" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i432-khach-san-201x300.jpg 201w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i432-khach-san.jpg 271w" sizes="auto, (max-width: 201px) 100vw, 201px" />',
            name_description_code: '<p class="sign-name">Biển báo I.432 – Khách sạn</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-432-khach-san/" class="sign-link-overlay" title="Biển báo I.432 – Khách sạn"></a>',
        },
        {
            image: '<img width="200" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i431-tram-dung-nghi-200x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.431 - Trạm dừng nghỉ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i431-tram-dung-nghi-200x300.jpg 200w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i431-tram-dung-nghi.jpg 330w" sizes="auto, (max-width: 200px) 100vw, 200px" />',
            name_description_code: '<p class="sign-name">Biển báo I.431 – Trạm dừng nghỉ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-431-tram-dung-nghi/" class="sign-link-overlay" title="Biển báo I.431 – Trạm dừng nghỉ"></a>',
        },
        {
            image: '<img width="202" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i430-dien-thoai-202x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.430 - Điện thoại" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i430-dien-thoai-202x300.jpg 202w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i430-dien-thoai.jpg 233w" sizes="auto, (max-width: 202px) 100vw, 202px" />',
            name_description_code: '<p class="sign-name">Biển báo I.430 – Điện thoại</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-430-dien-thoai/" class="sign-link-overlay" title="Biển báo I.430 – Điện thoại"></a>',
        },
        {
            image: '<img width="216" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i429-noi-rua-xe-216x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.429 - Nơi rửa xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i429-noi-rua-xe-216x300.jpg 216w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i429-noi-rua-xe.jpg 443w" sizes="auto, (max-width: 216px) 100vw, 216px" />',
            name_description_code: '<p class="sign-name">Biển báo I.429 – Nơi rửa xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-429-noi-rua-xe/" class="sign-link-overlay" title="Biển báo I.429 – Nơi rửa xe"></a>',
        },
        {
            image: '<img width="228" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i428-cua-hang-xang-dau-228x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.428 - Cửa hàng xăng dầu" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i428-cua-hang-xang-dau-228x300.jpg 228w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i428-cua-hang-xang-dau.jpg 271w" sizes="auto, (max-width: 228px) 100vw, 228px" />',
            name_description_code: '<p class="sign-name">Biển báo I.428 – Cửa hàng xăng dầu</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-428-cua-hang-xang-dau/" class="sign-link-overlay" title="Biển báo I.428 – Cửa hàng xăng dầu"></a>',
        },
        {
            image: '<img width="229" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i427b-tram-kiem-tra-tai-trong-xe-229x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.427b - Trạm kiểm tra tải trọng xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i427b-tram-kiem-tra-tai-trong-xe-229x300.jpg 229w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i427b-tram-kiem-tra-tai-trong-xe.jpg 290w" sizes="auto, (max-width: 229px) 100vw, 229px" />',
            name_description_code: '<p class="sign-name">Biển báo I.427b – Trạm kiểm tra tải trọng xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-427b-tram-kiem-tra-tai-trong-xe/" class="sign-link-overlay" title="Biển báo I.427b – Trạm kiểm tra tải trọng xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i427a-tram-sua-chua-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.427a - Trạm sửa chữa" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i427a-tram-sua-chua-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i427a-tram-sua-chua.jpg 303w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo I.427a – Trạm sửa chữa</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-427a-tram-sua-chua/" class="sign-link-overlay" title="Biển báo I.427a – Trạm sửa chữa"></a>',
        },
        {
            image: '<img width="227" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i426-tram-cap-cuu-227x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.426 - Trạm cấp cứu" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i426-tram-cap-cuu-227x300.jpg 227w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i426-tram-cap-cuu.jpg 271w" sizes="auto, (max-width: 227px) 100vw, 227px" />',
            name_description_code: '<p class="sign-name">Biển báo I.426 – Trạm cấp cứu</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-426-tram-cap-cuu/" class="sign-link-overlay" title="Biển báo I.426 – Trạm cấp cứu"></a>',
        },
        {
            image: '<img width="272" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i425-benh-vien.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.425 - Bệnh viện" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i425-benh-vien.jpg 272w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i425-benh-vien-150x150.jpg 150w" sizes="auto, (max-width: 272px) 100vw, 272px" />',
            name_description_code: '<p class="sign-name">Biển báo I.425 – Bệnh viện</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-425-benh-vien/" class="sign-link-overlay" title="Biển báo I.425 – Bệnh viện"></a>',
        },
        {
            image: '<img width="271" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424d-ham-chui-qua-duong-cho-nguoi-di-bo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.424d - Hầm chui qua đường cho người đi bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424d-ham-chui-qua-duong-cho-nguoi-di-bo.jpg 271w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424d-ham-chui-qua-duong-cho-nguoi-di-bo-150x150.jpg 150w" sizes="auto, (max-width: 271px) 100vw, 271px" />',
            name_description_code: '<p class="sign-name">Biển báo I.424d – Hầm chui qua đường cho người đi bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-424d-ham-chui-qua-duong-cho-nguoi-di-bo/" class="sign-link-overlay" title="Biển báo I.424d – Hầm chui qua đường cho người đi bộ"></a>',
        },
        {
            image: '<img width="272" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424c-ham-chui-qua-duong-cho-nguoi-di-bo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.424c - Hầm chui qua đường cho người đi bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424c-ham-chui-qua-duong-cho-nguoi-di-bo.jpg 272w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424c-ham-chui-qua-duong-cho-nguoi-di-bo-150x150.jpg 150w" sizes="auto, (max-width: 272px) 100vw, 272px" />',
            name_description_code: '<p class="sign-name">Biển báo I.424c – Hầm chui qua đường cho người đi bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-424c-ham-chui-qua-duong-cho-nguoi-di-bo/" class="sign-link-overlay" title="Biển báo I.424c – Hầm chui qua đường cho người đi bộ"></a>',
        },
        {
            image: '<img width="271" height="270" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424b-cau-vuot-qua-duong-cho-nguoi-di-bo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.424b - Cầu vượt qua đường cho người đi bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424b-cau-vuot-qua-duong-cho-nguoi-di-bo.jpg 271w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424b-cau-vuot-qua-duong-cho-nguoi-di-bo-150x150.jpg 150w" sizes="auto, (max-width: 271px) 100vw, 271px" />',
            name_description_code: '<p class="sign-name">Biển báo I.424b – Cầu vượt qua đường cho người đi bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-424b-cau-vuot-qua-duong-cho-nguoi-di-bo/" class="sign-link-overlay" title="Biển báo I.424b – Cầu vượt qua đường cho người đi bộ"></a>',
        },
        {
            image: '<img width="269" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424a-cau-vuot-qua-duong-cho-nguoi-di-bo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.424a - Cầu vượt qua đường cho người đi bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424a-cau-vuot-qua-duong-cho-nguoi-di-bo.jpg 269w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i424a-cau-vuot-qua-duong-cho-nguoi-di-bo-150x150.jpg 150w" sizes="auto, (max-width: 269px) 100vw, 269px" />',
            name_description_code: '<p class="sign-name">Biển báo I.424a – Cầu vượt qua đường cho người đi bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-424a-cau-vuot-qua-duong-cho-nguoi-di-bo/" class="sign-link-overlay" title="Biển báo I.424a – Cầu vượt qua đường cho người đi bộ"></a>',
        },
        {
            image: '<img width="227" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423c-diem-bat-dau-duong-di-bo-227x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.423c - Điểm bắt đầu đường đi bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423c-diem-bat-dau-duong-di-bo-227x300.jpg 227w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423c-diem-bat-dau-duong-di-bo.jpg 247w" sizes="auto, (max-width: 227px) 100vw, 227px" />',
            name_description_code: '<p class="sign-name">Biển báo I.423c – Điểm bắt đầu đường đi bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-423c-diem-bat-dau-duong-di-bo/" class="sign-link-overlay" title="Biển báo I.423c – Điểm bắt đầu đường đi bộ"></a>',
        },
        {
            image: '<img width="270" height="270" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423b-vi-tri-nguoi-di-bo-sang-ngang.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.423b - Vị trí người đi bộ sang ngang" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423b-vi-tri-nguoi-di-bo-sang-ngang.jpg 270w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423b-vi-tri-nguoi-di-bo-sang-ngang-150x150.jpg 150w" sizes="auto, (max-width: 270px) 100vw, 270px" />',
            name_description_code: '<p class="sign-name">Biển báo I.423b – Vị trí người đi bộ sang ngang</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-423b-vi-tri-nguoi-di-bo-sang-ngang/" class="sign-link-overlay" title="Biển báo I.423b – Vị trí người đi bộ sang ngang"></a>',
        },
        {
            image: '<img width="271" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423a-vi-tri-nguoi-di-bo-sang-ngang.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.423a - Vị trí người đi bộ sang ngang" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423a-vi-tri-nguoi-di-bo-sang-ngang.jpg 271w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i423a-vi-tri-nguoi-di-bo-sang-ngang-150x150.jpg 150w" sizes="auto, (max-width: 271px) 100vw, 271px" />',
            name_description_code: '<p class="sign-name">Biển báo I.423a – Vị trí người đi bộ sang ngang</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-423a-vi-tri-nguoi-di-bo-sang-ngang/" class="sign-link-overlay" title="Biển báo I.423a – Vị trí người đi bộ sang ngang"></a>',
        },
        {
            image: '<img width="300" height="205" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i422-di-tich-lich-su-300x205.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.422 - Di tích lịch sử" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i422-di-tich-lich-su-300x205.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i422-di-tich-lich-su.jpg 396w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.422 – Di tích lịch sử</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-422-di-tich-lich-su/" class="sign-link-overlay" title="Biển báo I.422 – Di tích lịch sử"></a>',
        },
        {
            image: '<img width="300" height="251" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i419-chi-dan-dia-gioi-300x251.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.419 - Chỉ dẫn địa giới" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i419-chi-dan-dia-gioi-300x251.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i419-chi-dan-dia-gioi.jpg 323w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.419 – Chỉ dẫn địa giới</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-419-chi-dan-dia-gioi/" class="sign-link-overlay" title="Biển báo I.419 – Chỉ dẫn địa giới"></a>',
        },
        {
            image: '<img width="300" height="249" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i418-loi-di-o-nhung-vi-tri-cam-re-300x249.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.418 - Lối đi ở những vị trí cấm rẽ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i418-loi-di-o-nhung-vi-tri-cam-re-300x249.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i418-loi-di-o-nhung-vi-tri-cam-re.jpg 326w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.418 – Lối đi ở những vị trí cấm rẽ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-418-loi-di-o-nhung-vi-tri-cam-re/" class="sign-link-overlay" title="Biển báo I.418 – Lối đi ở những vị trí cấm rẽ"></a>',
        },
        {
            image: '<img width="300" height="124" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417c-chi-huong-duong-phai-di-cho-tung-loai-xe-300x124.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.417c - Chỉ hướng đường phải đi cho từng loại xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417c-chi-huong-duong-phai-di-cho-tung-loai-xe-300x124.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417c-chi-huong-duong-phai-di-cho-tung-loai-xe.jpg 629w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.417c – Chỉ hướng đường phải đi cho từng loại xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-417c-chi-huong-duong-phai-di-cho-tung-loai-xe/" class="sign-link-overlay" title="Biển báo I.417c – Chỉ hướng đường phải đi cho từng loại xe"></a>',
        },
        {
            image: '<img width="300" height="123" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417b-chi-huong-duong-phai-di-cho-tung-loai-xe-300x123.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.417b - Chỉ hướng đường phải đi cho từng loại xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417b-chi-huong-duong-phai-di-cho-tung-loai-xe-300x123.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417b-chi-huong-duong-phai-di-cho-tung-loai-xe.jpg 637w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.417b – Chỉ hướng đường phải đi cho từng loại xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-417b-chi-huong-duong-phai-di-cho-tung-loai-xe/" class="sign-link-overlay" title="Biển báo I.417b – Chỉ hướng đường phải đi cho từng loại xe"></a>',
        },
        {
            image: '<img width="300" height="123" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417a-chi-huong-duong-phai-di-cho-tung-loai-xe-300x123.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.417a - Chỉ hướng đường phải đi cho từng loại xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417a-chi-huong-duong-phai-di-cho-tung-loai-xe-300x123.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i417a-chi-huong-duong-phai-di-cho-tung-loai-xe.jpg 643w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.417a – Chỉ hướng đường phải đi cho từng loại xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-417a-chi-huong-duong-phai-di-cho-tung-loai-xe/" class="sign-link-overlay" title="Biển báo I.417a – Chỉ hướng đường phải đi cho từng loại xe"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i416-duong-tranh-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.416 - Đường tránh" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i416-duong-tranh-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i416-duong-tranh.jpg 354w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo I.416 – Đường tránh</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-416-duong-tranh/" class="sign-link-overlay" title="Biển báo I.416 – Đường tránh"></a>',
        },
        {
            image: '<img width="300" height="74" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i415-mui-ten-chi-huong-di-300x74.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.415 - Mũi tên chỉ hướng đi" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i415-mui-ten-chi-huong-di-300x74.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i415-mui-ten-chi-huong-di-768x189.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i415-mui-ten-chi-huong-di.jpg 846w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.415 – Mũi tên chỉ hướng đi</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-415-mui-ten-chi-huong-di/" class="sign-link-overlay" title="Biển báo I.415 – Mũi tên chỉ hướng đi"></a>',
        },
        {
            image: '<img width="300" height="223" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414d-chi-huong-duong-300x223.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.414d - Chỉ hướng đường" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414d-chi-huong-duong-300x223.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414d-chi-huong-duong.jpg 597w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.414d – Chỉ hướng đường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-414d-chi-huong-duong/" class="sign-link-overlay" title="Biển báo I.414d – Chỉ hướng đường"></a>',
        },
        {
            image: '<img width="300" height="202" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414c-chi-huong-duong-300x202.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.414c - Chỉ hướng đường" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414c-chi-huong-duong-300x202.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414c-chi-huong-duong.jpg 623w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.414c – Chỉ hướng đường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-414c-chi-huong-duong/" class="sign-link-overlay" title="Biển báo I.414c – Chỉ hướng đường"></a>',
        },
        {
            image: '<img width="300" height="204" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414b-chi-huong-duong-300x204.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.414b - Chỉ hướng đường" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414b-chi-huong-duong-300x204.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414b-chi-huong-duong.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.414b – Chỉ hướng đường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-414b-chi-huong-duong/" class="sign-link-overlay" title="Biển báo I.414b – Chỉ hướng đường"></a>',
        },
        {
            image: '<img width="300" height="190" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414a-chi-huong-duong-300x190.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.414a - Chỉ hướng đường" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414a-chi-huong-duong-300x190.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i414a-chi-huong-duong.jpg 337w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.414a – Chỉ hướng đường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-414a-chi-huong-duong/" class="sign-link-overlay" title="Biển báo I.414a – Chỉ hướng đường"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413c-re-ra-duong-co-lan-duong-danh-cho-o-to-khach-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.413c - Rẽ ra đường có làn đường dành cho ô tô khách" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413c-re-ra-duong-co-lan-duong-danh-cho-o-to-khach-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413c-re-ra-duong-co-lan-duong-danh-cho-o-to-khach-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413c-re-ra-duong-co-lan-duong-danh-cho-o-to-khach.jpg 332w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.413c – Rẽ ra đường có làn đường dành cho ô tô khách</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-413c-re-ra-duong-co-lan-duong-danh-cho-o-to-khach/" class="sign-link-overlay" title="Biển báo I.413c – Rẽ ra đường có làn đường dành cho ô tô khách"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413b-re-ra-duong-co-lan-duong-danh-cho-o-to-khach-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.413b - Rẽ ra đường có làn đường dành cho ô tô khách" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413b-re-ra-duong-co-lan-duong-danh-cho-o-to-khach-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413b-re-ra-duong-co-lan-duong-danh-cho-o-to-khach-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413b-re-ra-duong-co-lan-duong-danh-cho-o-to-khach.jpg 332w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.413b – Rẽ ra đường có làn đường dành cho ô tô khách</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-413b-re-ra-duong-co-lan-duong-danh-cho-o-to-khach/" class="sign-link-overlay" title="Biển báo I.413b – Rẽ ra đường có làn đường dành cho ô tô khách"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413a-duong-phia-truoc-co-lan-duong-danh-cho-o-to-khach-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.413a - Đường phía trước có làn đường dành cho ô tô khách" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413a-duong-phia-truoc-co-lan-duong-danh-cho-o-to-khach-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413a-duong-phia-truoc-co-lan-duong-danh-cho-o-to-khach-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i413a-duong-phia-truoc-co-lan-duong-danh-cho-o-to-khach.jpg 332w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo I.413a – Đường phía trước có làn đường dành cho ô tô khách</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-413a-duong-phia-truoc-co-lan-duong-danh-cho-o-to-khach/" class="sign-link-overlay" title="Biển báo I.413a – Đường phía trước có làn đường dành cho ô tô khách"></a>',
        },
        {
            image: '<img width="271" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i410-khu-vuc-quay-xe.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.410 - Khu vực quay xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i410-khu-vuc-quay-xe.jpg 271w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i410-khu-vuc-quay-xe-150x150.jpg 150w" sizes="auto, (max-width: 271px) 100vw, 271px" />',
            name_description_code: '<p class="sign-name">Biển báo I.410 – Khu vực quay xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-410-khu-vuc-quay-xe/" class="sign-link-overlay" title="Biển báo I.410 – Khu vực quay xe"></a>',
        },
        {
            image: '<img width="271" height="270" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i409-cho-quay-xe.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.409 - Chỗ quay xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i409-cho-quay-xe.jpg 271w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i409-cho-quay-xe-150x150.jpg 150w" sizes="auto, (max-width: 271px) 100vw, 271px" />',
            name_description_code: '<p class="sign-name">Biển báo I.409 – Chỗ quay xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-409-cho-quay-xe/" class="sign-link-overlay" title="Biển báo I.409 – Chỗ quay xe"></a>',
        },
        {
            image: '<img width="184" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i408a-noi-do-xe-mot-phan-tren-he-pho-184x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.408a - Nơi đỗ xe một phần trên hè phố" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i408a-noi-do-xe-mot-phan-tren-he-pho-184x300.jpg 184w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i408a-noi-do-xe-mot-phan-tren-he-pho.jpg 312w" sizes="auto, (max-width: 184px) 100vw, 184px" />',
            name_description_code: '<p class="sign-name">Biển báo I.408a – Nơi đỗ xe một phần trên hè phố</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-408a-noi-do-xe-mot-phan-tren-he-pho/" class="sign-link-overlay" title="Biển báo I.408a – Nơi đỗ xe một phần trên hè phố"></a>',
        },
        {
            image: '<img width="130" height="129" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i408-noi-do-xe.png" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.408 - Nơi đỗ xe" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo I.408 – Nơi đỗ xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-408-noi-do-xe/" class="sign-link-overlay" title="Biển báo I.408 – Nơi đỗ xe"></a>',
        },
        {
            image: '<img width="300" height="72" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-300x72.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.407a,b,c – Đường một chiều" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-300x72.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-768x183.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu.jpg 1015w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.407c – Đường một chiều</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-407c-duong-mot-chieu/" class="sign-link-overlay" title="Biển báo I.407c – Đường một chiều"></a>',
        },
        {
            image: '<img width="300" height="72" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-300x72.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.407a,b,c – Đường một chiều" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-300x72.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-768x183.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu.jpg 1015w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.407b – Đường một chiều</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-407b-duong-mot-chieu/" class="sign-link-overlay" title="Biển báo I.407b – Đường một chiều"></a>',
        },
        {
            image: '<img width="300" height="72" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-300x72.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.407a,b,c – Đường một chiều" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-300x72.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu-768x183.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i407a-b-c-duong-mot-chieu.jpg 1015w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.407a – Đường một chiều</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-407a-duong-mot-chieu/" class="sign-link-overlay" title="Biển báo I.407a – Đường một chiều"></a>',
        },
        {
            image: '<img width="273" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i406-duoc-uu-tien-qua-duong-hep.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.406 - Được ưu tiên qua đường hẹp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i406-duoc-uu-tien-qua-duong-hep.jpg 273w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i406-duoc-uu-tien-qua-duong-hep-150x150.jpg 150w" sizes="auto, (max-width: 273px) 100vw, 273px" />',
            name_description_code: '<p class="sign-name">Biển báo I.406 – Được ưu tiên qua đường hẹp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-406-duoc-uu-tien-qua-duong-hep/" class="sign-link-overlay" title="Biển báo I.406 – Được ưu tiên qua đường hẹp"></a>',
        },
        {
            image: '<img width="271" height="271" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405c-duong-cut.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.405c - Đường cụt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405c-duong-cut.jpg 271w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405c-duong-cut-150x150.jpg 150w" sizes="auto, (max-width: 271px) 100vw, 271px" />',
            name_description_code: '<p class="sign-name">Biển báo I.405c – Đường cụt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-405c-duong-cut/" class="sign-link-overlay" title="Biển báo I.405c – Đường cụt"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405b-duong-cut-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.405b - Đường cụt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405b-duong-cut-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405b-duong-cut.jpg 290w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo I.405b – Đường cụt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-405b-duong-cut/" class="sign-link-overlay" title="Biển báo I.405b – Đường cụt"></a>',
        },
        {
            image: '<img width="228" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405a-duong-cut-228x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.405a - Đường cụt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405a-duong-cut-228x300.jpg 228w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i405a-duong-cut.jpg 273w" sizes="auto, (max-width: 228px) 100vw, 228px" />',
            name_description_code: '<p class="sign-name">Biển báo I.405a – Đường cụt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-405a-duong-cut/" class="sign-link-overlay" title="Biển báo I.405a – Đường cụt"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i402-het-doan-duong-uu-tien-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.402 - Hết đoạn đường ưu tiên" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i402-het-doan-duong-uu-tien-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i402-het-doan-duong-uu-tien-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i402-het-doan-duong-uu-tien.jpg 319w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.402 – Hết đoạn đường ưu tiên</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-402-het-doan-duong-uu-tien/" class="sign-link-overlay" title="Biển báo I.402 – Hết đoạn đường ưu tiên"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i401-bat-dau-duong-uu-tien-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo I.401 - Bắt đầu đường ưu tiên" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i401-bat-dau-duong-uu-tien-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i401-bat-dau-duong-uu-tien-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-i401-bat-dau-duong-uu-tien.jpg 319w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo I.401 – Bắt đầu đường ưu tiên</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-i-401-bat-dau-duong-uu-tien/" class="sign-link-overlay" title="Biển báo I.401 – Bắt đầu đường ưu tiên"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re11b-ket-thuc-ham-chui-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,11b - Kết thúc hầm chui" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re11b-ket-thuc-ham-chui-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re11b-ket-thuc-ham-chui.jpg 235w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,11b – Kết thúc hầm chui</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e11b-ket-thuc-ham-chui/" class="sign-link-overlay" title="Biển báo R.E,11b – Kết thúc hầm chui"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re11a-bao-hieu-co-ham-chui-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,11a - Báo hiệu có hầm chui" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re11a-bao-hieu-co-ham-chui-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re11a-bao-hieu-co-ham-chui.jpg 235w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,11a – Báo hiệu có hầm chui</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e11a-bao-hieu-co-ham-chui/" class="sign-link-overlay" title="Biển báo R.E,11a – Báo hiệu có hầm chui"></a>',
        },
        {
            image: '<img width="184" height="274" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10d-bien-het-hieu-luc-khu-vuc.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,10d - Biển hết hiệu lực khu vực" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,10d – Biển hết hiệu lực khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e10d-bien-het-hieu-luc-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,10d – Biển hết hiệu lực khu vực"></a>',
        },
        {
            image: '<img width="201" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10c-bien-het-hieu-luc-khu-vuc-201x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,10c - Biển hết hiệu lực khu vực" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10c-bien-het-hieu-luc-khu-vuc-201x300.jpg 201w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10c-bien-het-hieu-luc-khu-vuc.jpg 275w" sizes="auto, (max-width: 201px) 100vw, 201px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,10c – Biển hết hiệu lực khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e10c-bien-het-hieu-luc-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,10c – Biển hết hiệu lực khu vực"></a>',
        },
        {
            image: '<img width="188" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10b-bien-het-hieu-luc-khu-vuc-188x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,10b - Biển hết hiệu lực khu vực" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10b-bien-het-hieu-luc-khu-vuc-188x300.jpg 188w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10b-bien-het-hieu-luc-khu-vuc.jpg 214w" sizes="auto, (max-width: 188px) 100vw, 188px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,10b – Biển hết hiệu lực khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e10b-bien-het-hieu-luc-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,10b – Biển hết hiệu lực khu vực"></a>',
        },
        {
            image: '<img width="201" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10a-bien-het-hieu-luc-khu-vuc-201x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,10a - Biển hết hiệu lực khu vực" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10a-bien-het-hieu-luc-khu-vuc-201x300.jpg 201w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re10a-bien-het-hieu-luc-khu-vuc.jpg 214w" sizes="auto, (max-width: 201px) 100vw, 201px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,10a – Biển hết hiệu lực khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e10a-bien-het-hieu-luc-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,10a – Biển hết hiệu lực khu vực"></a>',
        },
        {
            image: '<img width="185" height="275" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9d-bien-hieu-lenh-co-tac-dung-trong-khu-vuc.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,9d - Biển hiệu lệnh có tác dụng trong khu vực" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,9d – Biển hiệu lệnh có tác dụng trong khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e9d-bien-hieu-lenh-co-tac-dung-trong-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,9d – Biển hiệu lệnh có tác dụng trong khu vực"></a>',
        },
        {
            image: '<img width="201" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9c-bien-hieu-lenh-co-tac-dung-trong-khu-vuc-201x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,9c - Biển hiệu lệnh có tác dụng trong khu vực" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9c-bien-hieu-lenh-co-tac-dung-trong-khu-vuc-201x300.jpg 201w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9c-bien-hieu-lenh-co-tac-dung-trong-khu-vuc.jpg 288w" sizes="auto, (max-width: 201px) 100vw, 201px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,9c – Biển hiệu lệnh có tác dụng trong khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e9c-bien-hieu-lenh-co-tac-dung-trong-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,9c – Biển hiệu lệnh có tác dụng trong khu vực"></a>',
        },
        {
            image: '<img width="202" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9b-bien-hieu-lenh-co-tac-dung-trong-khu-vuc-202x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,9b - Biển hiệu lệnh có tác dụng trong khu vực" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9b-bien-hieu-lenh-co-tac-dung-trong-khu-vuc-202x300.jpg 202w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9b-bien-hieu-lenh-co-tac-dung-trong-khu-vuc.jpg 217w" sizes="auto, (max-width: 202px) 100vw, 202px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,9b – Biển hiệu lệnh có tác dụng trong khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e9b-bien-hieu-lenh-co-tac-dung-trong-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,9b – Biển hiệu lệnh có tác dụng trong khu vực"></a>',
        },
        {
            image: '<img width="201" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9a-bien-hieu-lenh-co-tac-dung-trong-khu-vuc-201x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.E,9a - Biển hiệu lệnh có tác dụng trong khu vực" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9a-bien-hieu-lenh-co-tac-dung-trong-khu-vuc-201x300.jpg 201w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-re9a-bien-hieu-lenh-co-tac-dung-trong-khu-vuc.jpg 218w" sizes="auto, (max-width: 201px) 100vw, 201px" />',
            name_description_code: '<p class="sign-name">Biển báo R.E,9a – Biển hiệu lệnh có tác dụng trong khu vực</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-e9a-bien-hieu-lenh-co-tac-dung-trong-khu-vuc/" class="sign-link-overlay" title="Biển báo R.E,9a – Biển hiệu lệnh có tác dụng trong khu vực"></a>',
        },
        {
            image: '<img width="300" height="242" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r421-het-khu-dong-dan-cu-300x242.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.421 - Hết khu đông dân cư" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r421-het-khu-dong-dan-cu-300x242.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r421-het-khu-dong-dan-cu.jpg 473w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.421 – Hết khu đông dân cư</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-421-het-khu-dong-dan-cu/" class="sign-link-overlay" title="Biển báo R.421 – Hết khu đông dân cư"></a>',
        },
        {
            image: '<img width="300" height="243" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r420-bat-dau-khu-dong-dan-cu-300x243.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.420 - Bắt đầu khu đông dân cư" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r420-bat-dau-khu-dong-dan-cu-300x243.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r420-bat-dau-khu-dong-dan-cu.jpg 472w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.420 – Bắt đầu khu đông dân cư</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-420-bat-dau-khu-dong-dan-cu/" class="sign-link-overlay" title="Biển báo R.420 – Bắt đầu khu đông dân cư"></a>',
        },
        {
            image: '<img width="300" height="167" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r415-bien-gop-lan-duong-theo-phuong-tien-va-ket-thuc-lan-duong-theo-phuong-tien-300x167.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.415 - Biển gộp làn đường theo phương tiện và Kết thúc làn đường theo phương tiện" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r415-bien-gop-lan-duong-theo-phuong-tien-va-ket-thuc-lan-duong-theo-phuong-tien-300x167.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r415-bien-gop-lan-duong-theo-phuong-tien-va-ket-thuc-lan-duong-theo-phuong-tien.jpg 680w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.415 – Biển gộp làn đường theo phương tiện và Kết thúc làn đường theo phương tiện</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-415-bien-gop-lan-duong-theo-phuong-tien-va-ket-thuc-lan-duong-theo-phuong-tien/" class="sign-link-overlay" title="Biển báo R.415 – Biển gộp làn đường theo phương tiện và Kết thúc làn đường theo phương tiện"></a>',
        },
        {
            image: '<img width="148" height="198" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412p-ket-thuc-lan-duong-danh-rieng-cho-nhom-xe-khach-va-xe-con.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412p - Kết thúc làn đường dành riêng cho nhóm xe khách và xe con" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo R.412p – Kết thúc làn đường dành riêng cho nhóm xe khách và xe con</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412p-ket-thuc-lan-duong-danh-rieng-cho-nhom-xe-khach-va-xe-con/" class="sign-link-overlay" title="Biển báo R.412p – Kết thúc làn đường dành riêng cho nhóm xe khách và xe con"></a>',
        },
        {
            image: '<img width="230" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412o-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-230x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412o - Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412o-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-230x300.jpg 230w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412o-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 274w" sizes="auto, (max-width: 230px) 100vw, 230px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412o – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412o-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412o – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412n-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412n - Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412n-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412n-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 283w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412n – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412n-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412n – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="186" height="246" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412m-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412m - Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo R.412m – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412m-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412m – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412l-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412l - Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412l-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412l-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 275w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412l – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412l-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412l – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412k-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412k - Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412k-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412k-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 318w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412k – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412k-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412k – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412j-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412j - Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412j-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412j-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 282w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412j – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412j-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412j – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412i-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412i - Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412i-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412i-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 360w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412i – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412i-ket-thuc-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412i – Kết thúc làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="206" height="274" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412h-lan-duong-danh-rieng-cho-nhom-xe-khach-va-xe-con.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412h - Làn đường dành riêng cho nhóm xe khách và xe con" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo R.412h – Làn đường dành riêng cho nhóm xe khách và xe con</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412h-lan-duong-danh-rieng-cho-nhom-xe-khach-va-xe-con/" class="sign-link-overlay" title="Biển báo R.412h – Làn đường dành riêng cho nhóm xe khách và xe con"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412g-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412g - Làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412g-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412g-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 336w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412g – Làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412g-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412g – Làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="227" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412f-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-227x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412f - Làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412f-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-227x300.jpg 227w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412f-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 237w" sizes="auto, (max-width: 227px) 100vw, 227px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412f – Làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412f-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412f – Làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412e-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412e - Làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412e-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412e-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 255w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412e – Làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412e-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412e – Làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412d-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412d - Làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412d-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412d-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 336w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412d – Làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412d-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412d – Làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412c-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412c - Làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412c-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412c-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 318w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412c – Làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412c-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412c – Làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="223" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412b-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-223x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412b - Làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412b-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-223x300.jpg 223w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412b-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 233w" sizes="auto, (max-width: 223px) 100vw, 223px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412b – Làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412b-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412b – Làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412a-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.412a - Làn đường dành riêng cho từng loại xe hoặc nhóm xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412a-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r412a-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe.jpg 284w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.412a – Làn đường dành riêng cho từng loại xe hoặc nhóm xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-412a-lan-duong-danh-rieng-cho-tung-loai-xe-hoac-nhom-xe/" class="sign-link-overlay" title="Biển báo R.412a – Làn đường dành riêng cho từng loại xe hoặc nhóm xe"></a>',
        },
        {
            image: '<img width="300" height="150" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r411-huong-di-tren-moi-lan-duong-phai-theo-300x150.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.411 - Hướng đi trên mỗi làn đường phải theo" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r411-huong-di-tren-moi-lan-duong-phai-theo-300x150.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r411-huong-di-tren-moi-lan-duong-phai-theo.jpg 587w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.411 – Hướng đi trên mỗi làn đường phải theo</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-411-huong-di-tren-moi-lan-duong-phai-theo/" class="sign-link-overlay" title="Biển báo R.411 – Hướng đi trên mỗi làn đường phải theo"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404f-het-doan-duong-danh-cho-xe-may-va-xe-dap-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.404f - Hết đoạn đường dành cho xe máy và xe đạp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404f-het-doan-duong-danh-cho-xe-may-va-xe-dap-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404f-het-doan-duong-danh-cho-xe-may-va-xe-dap.jpg 338w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.404f – Hết đoạn đường dành cho xe máy và xe đạp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-404f-het-doan-duong-danh-cho-xe-may-va-xe-dap/" class="sign-link-overlay" title="Biển báo R.404f – Hết đoạn đường dành cho xe máy và xe đạp"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404e-het-doan-duong-danh-cho-xe-may-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.404e - Hết đoạn đường dành cho xe máy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404e-het-doan-duong-danh-cho-xe-may-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404e-het-doan-duong-danh-cho-xe-may.jpg 338w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo R.404e – Hết đoạn đường dành cho xe máy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-404e-het-doan-duong-danh-cho-xe-may/" class="sign-link-overlay" title="Biển báo R.404e – Hết đoạn đường dành cho xe máy"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404d-het-doan-duong-danh-cho-xe-oto-con-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.404d - Hết đoạn đường dành cho xe ôtô con" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404d-het-doan-duong-danh-cho-xe-oto-con-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404d-het-doan-duong-danh-cho-xe-oto-con.jpg 235w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.404d – Hết đoạn đường dành cho xe ôtô con</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-404d-het-doan-duong-danh-cho-xe-oto-con/" class="sign-link-overlay" title="Biển báo R.404d – Hết đoạn đường dành cho xe ôtô con"></a>',
        },
        {
            image: '<img width="227" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404c-het-doan-duong-danh-cho-xe-buyt-227x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.404c - Hết đoạn đường dành cho xe buýt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404c-het-doan-duong-danh-cho-xe-buyt-227x300.jpg 227w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404c-het-doan-duong-danh-cho-xe-buyt.jpg 309w" sizes="auto, (max-width: 227px) 100vw, 227px" />',
            name_description_code: '<p class="sign-name">Biển báo R.404c – Hết đoạn đường dành cho xe buýt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-404c-het-doan-duong-danh-cho-xe-buyt/" class="sign-link-overlay" title="Biển báo R.404c – Hết đoạn đường dành cho xe buýt"></a>',
        },
        {
            image: '<img width="227" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404b-het-doan-duong-danh-cho-xe-oto-xe-may-227x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.404b - Hết đoạn đường dành cho xe ôtô, xe máy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404b-het-doan-duong-danh-cho-xe-oto-xe-may-227x300.jpg 227w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404b-het-doan-duong-danh-cho-xe-oto-xe-may.jpg 236w" sizes="auto, (max-width: 227px) 100vw, 227px" />',
            name_description_code: '<p class="sign-name">Biển báo R.404b – Hết đoạn đường dành cho xe ôtô, xe máy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-404b-het-doan-duong-danh-cho-xe-oto-xe-may/" class="sign-link-overlay" title="Biển báo R.404b – Hết đoạn đường dành cho xe ôtô, xe máy"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404a-het-doan-duong-danh-cho-xe-oto-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.404a - Hết đoạn đường dành cho xe ôtô" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404a-het-doan-duong-danh-cho-xe-oto-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r404a-het-doan-duong-danh-cho-xe-oto.jpg 237w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.404a – Hết đoạn đường dành cho xe ôtô</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-404a-het-doan-duong-danh-cho-xe-oto/" class="sign-link-overlay" title="Biển báo R.404a – Hết đoạn đường dành cho xe ôtô"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403f-duong-danh-cho-xe-may-va-xe-dap-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.403f - Đường dành cho xe máy và xe đạp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403f-duong-danh-cho-xe-may-va-xe-dap-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403f-duong-danh-cho-xe-may-va-xe-dap.jpg 342w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.403f – Đường dành cho xe máy và xe đạp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-403f-duong-danh-cho-xe-may-va-xe-dap/" class="sign-link-overlay" title="Biển báo R.403f – Đường dành cho xe máy và xe đạp"></a>',
        },
        {
            image: '<img width="227" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403e-duong-danh-cho-xe-may-227x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.403e - Đường dành cho xe máy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403e-duong-danh-cho-xe-may-227x300.jpg 227w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403e-duong-danh-cho-xe-may.jpg 343w" sizes="auto, (max-width: 227px) 100vw, 227px" />',
            name_description_code: '<p class="sign-name">Biển báo R.403e – Đường dành cho xe máy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-403e-duong-danh-cho-xe-may/" class="sign-link-overlay" title="Biển báo R.403e – Đường dành cho xe máy"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403d-duong-danh-cho-xe-oto-con-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.403d - Đường dành cho xe ôtô con" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403d-duong-danh-cho-xe-oto-con-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403d-duong-danh-cho-xe-oto-con.jpg 240w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo R.403d – Đường dành cho xe ôtô con</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-403d-duong-danh-cho-xe-oto-con/" class="sign-link-overlay" title="Biển báo R.403d – Đường dành cho xe ôtô con"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403c-duong-danh-cho-xe-buyt-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.403c - Đường dành cho xe buýt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403c-duong-danh-cho-xe-buyt-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403c-duong-danh-cho-xe-buyt.jpg 316w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo R.403c – Đường dành cho xe buýt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-403c-duong-danh-cho-xe-buyt/" class="sign-link-overlay" title="Biển báo R.403c – Đường dành cho xe buýt"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403b-duong-danh-cho-xe-oto-xe-may-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.403b - Đường dành cho xe ôtô, xe máy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403b-duong-danh-cho-xe-oto-xe-may-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403b-duong-danh-cho-xe-oto-xe-may.jpg 240w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo R.403b – Đường dành cho xe ôtô, xe máy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-403b-duong-danh-cho-xe-oto-xe-may/" class="sign-link-overlay" title="Biển báo R.403b – Đường dành cho xe ôtô, xe máy"></a>',
        },
        {
            image: '<img width="226" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403a-duong-danh-cho-xe-oto-226x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.403a - Đường dành cho xe ôtô" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403a-duong-danh-cho-xe-oto-226x300.jpg 226w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r403a-duong-danh-cho-xe-oto.jpg 240w" sizes="auto, (max-width: 226px) 100vw, 226px" />',
            name_description_code: '<p class="sign-name">Biển báo R.403a – Đường dành cho xe ôtô</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-403a-duong-danh-cho-xe-oto/" class="sign-link-overlay" title="Biển báo R.403a – Đường dành cho xe ôtô"></a>',
        },
        {
            image: '<img width="300" height="128" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r310a-b-c-huong-di-phai-theo-cho-cac-xe-cho-hang-nguy-hiem-300x128.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.310a,b,c - Hướng đi phải theo cho các xe chở hàng nguy hiểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r310a-b-c-huong-di-phai-theo-cho-cac-xe-cho-hang-nguy-hiem-300x128.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r310a-b-c-huong-di-phai-theo-cho-cac-xe-cho-hang-nguy-hiem-1024x437.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r310a-b-c-huong-di-phai-theo-cho-cac-xe-cho-hang-nguy-hiem-768x328.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r310a-b-c-huong-di-phai-theo-cho-cac-xe-cho-hang-nguy-hiem.jpg 1280w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.310a,b,c – Hướng đi phải theo cho các xe chở hàng nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-310abc-huong-di-phai-theo-cho-cac-xe-cho-hang-nguy-hiem/" class="sign-link-overlay" title="Biển báo R.310a,b,c – Hướng đi phải theo cho các xe chở hàng nguy hiểm"></a>',
        },
        {
            image: '<img width="262" height="261" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r309-an-coi.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.309 - Ấn còi" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r309-an-coi.jpg 262w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r309-an-coi-150x150.jpg 150w" sizes="auto, (max-width: 262px) 100vw, 262px" />',
            name_description_code: '<p class="sign-name">Biển báo R.309 – Ấn còi</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-309-an-coi/" class="sign-link-overlay" title="Biển báo R.309 – Ấn còi"></a>',
        },
        {
            image: '<img width="256" height="256" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r308b-tuyen-duong-cau-vuot-cat-qua.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.308b - Tuyến đường cầu vượt cắt qua" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r308b-tuyen-duong-cau-vuot-cat-qua.jpg 256w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r308b-tuyen-duong-cau-vuot-cat-qua-150x150.jpg 150w" sizes="auto, (max-width: 256px) 100vw, 256px" />',
            name_description_code: '<p class="sign-name">Biển báo R.308b – Tuyến đường cầu vượt cắt qua</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-308b-tuyen-duong-cau-vuot-cat-qua/" class="sign-link-overlay" title="Biển báo R.308b – Tuyến đường cầu vượt cắt qua"></a>',
        },
        {
            image: '<img width="256" height="256" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r308a-tuyen-duong-cau-vuot-cat-qua.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.308a - Tuyến đường cầu vượt cắt qua" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r308a-tuyen-duong-cau-vuot-cat-qua.jpg 256w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r308a-tuyen-duong-cau-vuot-cat-qua-150x150.jpg 150w" sizes="auto, (max-width: 256px) 100vw, 256px" />',
            name_description_code: '<p class="sign-name">Biển báo R.308a – Tuyến đường cầu vượt cắt qua</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-308a-tuyen-duong-cau-vuot-cat-qua/" class="sign-link-overlay" title="Biển báo R.308a – Tuyến đường cầu vượt cắt qua"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r307-het-toc-do-toi-thieu-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.307 - Hết tốc độ tối thiểu" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r307-het-toc-do-toi-thieu-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r307-het-toc-do-toi-thieu-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r307-het-toc-do-toi-thieu.jpg 452w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.307 – Hết tốc độ tối thiểu</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-307-het-toc-do-toi-thieu/" class="sign-link-overlay" title="Biển báo R.307 – Hết tốc độ tối thiểu"></a>',
        },
        {
            image: '<img width="288" height="286" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r306-toc-do-toi-thieu-cho-phep.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.306 - Tốc độ tối thiểu cho phép" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r306-toc-do-toi-thieu-cho-phep.jpg 288w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r306-toc-do-toi-thieu-cho-phep-150x150.jpg 150w" sizes="auto, (max-width: 288px) 100vw, 288px" />',
            name_description_code: '<p class="sign-name">Biển báo R.306 – Tốc độ tối thiểu cho phép</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-306-toc-do-toi-thieu-cho-phep/" class="sign-link-overlay" title="Biển báo R.306 – Tốc độ tối thiểu cho phép"></a>',
        },
        {
            image: '<img width="256" height="256" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r305-duong-danh-cho-nguoi-di-bo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.305 - Đường dành cho người đi bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r305-duong-danh-cho-nguoi-di-bo.jpg 256w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r305-duong-danh-cho-nguoi-di-bo-150x150.jpg 150w" sizes="auto, (max-width: 256px) 100vw, 256px" />',
            name_description_code: '<p class="sign-name">Biển báo R.305 – Đường dành cho người đi bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-305-duong-danh-cho-nguoi-di-bo/" class="sign-link-overlay" title="Biển báo R.305 – Đường dành cho người đi bộ"></a>',
        },
        {
            image: '<img width="241" height="243" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r304-duong-danh-cho-xe-tho-so.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.304 - Đường dành cho xe thô sơ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r304-duong-danh-cho-xe-tho-so.jpg 241w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r304-duong-danh-cho-xe-tho-so-150x150.jpg 150w" sizes="auto, (max-width: 241px) 100vw, 241px" />',
            name_description_code: '<p class="sign-name">Biển báo R.304 – Đường dành cho xe thô sơ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-304-duong-danh-cho-xe-tho-so/" class="sign-link-overlay" title="Biển báo R.304 – Đường dành cho xe thô sơ"></a>',
        },
        {
            image: '<img width="257" height="256" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r303-noi-giao-nhau-chay-theo-vong-xuyen.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.303 - Nơi giao nhau chạy theo vòng xuyến" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r303-noi-giao-nhau-chay-theo-vong-xuyen.jpg 257w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r303-noi-giao-nhau-chay-theo-vong-xuyen-150x150.jpg 150w" sizes="auto, (max-width: 257px) 100vw, 257px" />',
            name_description_code: '<p class="sign-name">Biển báo R.303 – Nơi giao nhau chạy theo vòng xuyến</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-303-noi-giao-nhau-chay-theo-vong-xuyen/" class="sign-link-overlay" title="Biển báo R.303 – Nơi giao nhau chạy theo vòng xuyến"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302c-huong-phai-di-vong-chuong-ngai-vat-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.302c - Hướng phải đi vòng chướng ngại vật" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302c-huong-phai-di-vong-chuong-ngai-vat-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302c-huong-phai-di-vong-chuong-ngai-vat-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302c-huong-phai-di-vong-chuong-ngai-vat.jpg 436w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.302c – Hướng phải đi vòng chướng ngại vật</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-302c-huong-phai-di-vong-chuong-ngai-vat/" class="sign-link-overlay" title="Biển báo R.302c – Hướng phải đi vòng chướng ngại vật"></a>',
        },
        {
            image: '<img width="300" height="294" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302b-huong-phai-di-vong-chuong-ngai-vat-300x294.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.302b - Hướng phải đi vòng chướng ngại vật" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302b-huong-phai-di-vong-chuong-ngai-vat-300x294.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302b-huong-phai-di-vong-chuong-ngai-vat-1024x1003.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302b-huong-phai-di-vong-chuong-ngai-vat-768x752.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302b-huong-phai-di-vong-chuong-ngai-vat.jpg 1276w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.302b – Hướng phải đi vòng chướng ngại vật</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-302b-huong-phai-di-vong-chuong-ngai-vat/" class="sign-link-overlay" title="Biển báo R.302b – Hướng phải đi vòng chướng ngại vật"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302a-huong-phai-di-vong-chuong-ngai-vat-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.302a - Hướng phải đi vòng chướng ngại vật" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302a-huong-phai-di-vong-chuong-ngai-vat-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302a-huong-phai-di-vong-chuong-ngai-vat-1016x1024.jpg 1016w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302a-huong-phai-di-vong-chuong-ngai-vat-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302a-huong-phai-di-vong-chuong-ngai-vat-768x774.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r302a-huong-phai-di-vong-chuong-ngai-vat.jpg 1240w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo R.302a – Hướng phải đi vòng chướng ngại vật</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-302a-huong-phai-di-vong-chuong-ngai-vat/" class="sign-link-overlay" title="Biển báo R.302a – Hướng phải đi vòng chướng ngại vật"></a>',
        },
        {
            image: '<img width="300" height="70" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301e-f-g-h-huong-di-phai-theo-300x70.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.301e,f,g,h - Hướng đi phải theo" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301e-f-g-h-huong-di-phai-theo-300x70.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301e-f-g-h-huong-di-phai-theo-1024x240.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301e-f-g-h-huong-di-phai-theo-768x180.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301e-f-g-h-huong-di-phai-theo.jpg 1280w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.301e,f,g,h – Hướng đi phải theo</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-301efgh-huong-di-phai-theo/" class="sign-link-overlay" title="Biển báo R.301e,f,g,h – Hướng đi phải theo"></a>',
        },
        {
            image: '<img width="300" height="73" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301a-b-c-d-huong-di-phai-theo-300x73.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.301a,b,c,d - Hướng đi phải theo" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301a-b-c-d-huong-di-phai-theo-300x73.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301a-b-c-d-huong-di-phai-theo-1024x250.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301a-b-c-d-huong-di-phai-theo-768x187.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r301a-b-c-d-huong-di-phai-theo.jpg 1280w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo R.301a,b,c,d – Hướng đi phải theo</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-301abcd-huong-di-phai-theo/" class="sign-link-overlay" title="Biển báo R.301a,b,c,d – Hướng đi phải theo"></a>',
        },
        {
            image: '<img width="249" height="250" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r122-dung-lai.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo R.122 - Dừng lại" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r122-dung-lai.jpg 249w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-r122-dung-lai-150x150.jpg 150w" sizes="auto, (max-width: 249px) 100vw, 249px" />',
            name_description_code: '<p class="sign-name">Biển báo R.122 – Dừng lại</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-r-122-dung-lai/" class="sign-link-overlay" title="Biển báo R.122 – Dừng lại"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w247-chu-y-xe-do-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.247 - Chú ý xe đỗ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w247-chu-y-xe-do-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w247-chu-y-xe-do.jpg 321w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.247 – Chú ý xe đỗ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-247-chu-y-xe-do/" class="sign-link-overlay" title="Biển báo W.247 – Chú ý xe đỗ"></a>',
        },
        {
            image: '<img width="253" height="225" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w246c-chu-y-chuong-ngai-vat.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.246c - Chú ý chướng ngại vật" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.246c – Chú ý chướng ngại vật</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-246c-chu-y-chuong-ngai-vat/" class="sign-link-overlay" title="Biển báo W.246c – Chú ý chướng ngại vật"></a>',
        },
        {
            image: '<img width="300" height="262" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w246b-chu-y-chuong-ngai-vat-300x262.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.246b - Chú ý chướng ngại vật" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w246b-chu-y-chuong-ngai-vat-300x262.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w246b-chu-y-chuong-ngai-vat.jpg 310w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.246b – Chú ý chướng ngại vật</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-246b-chu-y-chuong-ngai-vat/" class="sign-link-overlay" title="Biển báo W.246b – Chú ý chướng ngại vật"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w246a-chu-y-chuong-ngai-vat-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.246a - Chú ý chướng ngại vật" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w246a-chu-y-chuong-ngai-vat-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w246a-chu-y-chuong-ngai-vat.jpg 309w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.246a – Chú ý chướng ngại vật</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-246a-chu-y-chuong-ngai-vat/" class="sign-link-overlay" title="Biển báo W.246a – Chú ý chướng ngại vật"></a>',
        },
        {
            image: '<img width="173" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w245b-di-cham-173x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.245b - Đi chậm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w245b-di-cham-173x300.jpg 173w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w245b-di-cham.jpg 203w" sizes="auto, (max-width: 173px) 100vw, 173px" />',
            name_description_code: '<p class="sign-name">Biển báo W.245b – Đi chậm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-245b-di-cham/" class="sign-link-overlay" title="Biển báo W.245b – Đi chậm"></a>',
        },
        {
            image: '<img width="285" height="250" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w245a-di-cham.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.245a - Đi chậm" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.245a – Đi chậm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-245a-di-cham/" class="sign-link-overlay" title="Biển báo W.245a – Đi chậm"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w244-doan-duong-hay-xay-ra-tai-nan-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.244 - Đoạn đường hay xảy ra tai nạn" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w244-doan-duong-hay-xay-ra-tai-nan-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w244-doan-duong-hay-xay-ra-tai-nan.jpg 313w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.244 – Đoạn đường hay xảy ra tai nạn</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-244-doan-duong-hay-xay-ra-tai-nan/" class="sign-link-overlay" title="Biển báo W.244 – Đoạn đường hay xảy ra tai nạn"></a>',
        },
        {
            image: '<img width="176" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243c-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo-176x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.243c - Nơi đường sắt giao không vuông góc với đường bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243c-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo-176x300.jpg 176w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243c-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo.jpg 194w" sizes="auto, (max-width: 176px) 100vw, 176px" />',
            name_description_code: '<p class="sign-name">Biển báo W.243c – Nơi đường sắt giao không vuông góc với đường bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-243c-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo/" class="sign-link-overlay" title="Biển báo W.243c – Nơi đường sắt giao không vuông góc với đường bộ"></a>',
        },
        {
            image: '<img width="174" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243b-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo-174x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.243b - Nơi đường sắt giao không vuông góc với đường bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243b-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo-174x300.jpg 174w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243b-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo.jpg 194w" sizes="auto, (max-width: 174px) 100vw, 174px" />',
            name_description_code: '<p class="sign-name">Biển báo W.243b – Nơi đường sắt giao không vuông góc với đường bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-243b-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo/" class="sign-link-overlay" title="Biển báo W.243b – Nơi đường sắt giao không vuông góc với đường bộ"></a>',
        },
        {
            image: '<img width="176" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243a-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo-176x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.243a - Nơi đường sắt giao không vuông góc với đường bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243a-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo-176x300.jpg 176w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w243a-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo.jpg 196w" sizes="auto, (max-width: 176px) 100vw, 176px" />',
            name_description_code: '<p class="sign-name">Biển báo W.243a – Nơi đường sắt giao không vuông góc với đường bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-243a-noi-duong-sat-giao-khong-vuong-goc-voi-duong-bo/" class="sign-link-overlay" title="Biển báo W.243a – Nơi đường sắt giao không vuông góc với đường bộ"></a>',
        },
        {
            image: '<img width="300" height="258" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w242b-noi-duong-sat-giao-vuong-goc-voi-duong-bo-300x258.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.242b - Nơi đường sắt giao vuông góc với đường bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w242b-noi-duong-sat-giao-vuong-goc-voi-duong-bo-300x258.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w242b-noi-duong-sat-giao-vuong-goc-voi-duong-bo.jpg 401w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.242b – Nơi đường sắt giao vuông góc với đường bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-242b-noi-duong-sat-giao-vuong-goc-voi-duong-bo/" class="sign-link-overlay" title="Biển báo W.242b – Nơi đường sắt giao vuông góc với đường bộ"></a>',
        },
        {
            image: '<img width="300" height="185" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w242a-noi-duong-sat-giao-vuong-goc-voi-duong-bo-300x185.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.242a - Nơi đường sắt giao vuông góc với đường bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w242a-noi-duong-sat-giao-vuong-goc-voi-duong-bo-300x185.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w242a-noi-duong-sat-giao-vuong-goc-voi-duong-bo.jpg 345w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.242a – Nơi đường sắt giao vuông góc với đường bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-242a-noi-duong-sat-giao-vuong-goc-voi-duong-bo/" class="sign-link-overlay" title="Biển báo W.242a – Nơi đường sắt giao vuông góc với đường bộ"></a>',
        },
        {
            image: '<img width="300" height="264" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w241-un-tac-giao-thong-300x264.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.241 - Ùn tắc giao thông" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w241-un-tac-giao-thong-300x264.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w241-un-tac-giao-thong.jpg 324w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.241 – Ùn tắc giao thông</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-241-un-tac-giao-thong/" class="sign-link-overlay" title="Biển báo W.241 – Ùn tắc giao thông"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w240-duong-ham-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.240 - Đường hầm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w240-duong-ham-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w240-duong-ham.jpg 323w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.240 – Đường hầm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-240-duong-ham/" class="sign-link-overlay" title="Biển báo W.240 – Đường hầm"></a>',
        },
        {
            image: '<img width="300" height="240" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239b-chieu-cao-tinh-khong-thuc-te-300x240.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.239b - Chiều cao tĩnh không thực tế" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239b-chieu-cao-tinh-khong-thuc-te-300x240.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239b-chieu-cao-tinh-khong-thuc-te-1024x819.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239b-chieu-cao-tinh-khong-thuc-te-768x614.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239b-chieu-cao-tinh-khong-thuc-te-1536x1229.jpg 1536w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239b-chieu-cao-tinh-khong-thuc-te.jpg 1600w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.239b – Chiều cao tĩnh không thực tế</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-239b-chieu-cao-tinh-khong-thuc-te/" class="sign-link-overlay" title="Biển báo W.239b – Chiều cao tĩnh không thực tế"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239a-duong-cap-dien-o-phia-tren-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.239a - Đường cáp điện ở phía trên" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239a-duong-cap-dien-o-phia-tren-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w239a-duong-cap-dien-o-phia-tren.jpg 324w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.239a – Đường cáp điện ở phía trên</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-239a-duong-cap-dien-o-phia-tren/" class="sign-link-overlay" title="Biển báo W.239a – Đường cáp điện ở phía trên"></a>',
        },
        {
            image: '<img width="300" height="264" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w238-duong-cao-toc-phia-truoc-300x264.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.238 - Đường cao tốc phía trước" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w238-duong-cao-toc-phia-truoc-300x264.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w238-duong-cao-toc-phia-truoc.jpg 324w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.238 – Đường cao tốc phía trước</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-238-duong-cao-toc-phia-truoc/" class="sign-link-overlay" title="Biển báo W.238 – Đường cao tốc phía trước"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w237-cau-vong-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.237 - Cầu vồng" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w237-cau-vong-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w237-cau-vong.jpg 324w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.237 – Cầu vồng</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-237-cau-vong/" class="sign-link-overlay" title="Biển báo W.237 – Cầu vồng"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w236-ket-thuc-duong-doi-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.236 - Kết thúc đường đôi" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w236-ket-thuc-duong-doi-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w236-ket-thuc-duong-doi.jpg 323w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.236 – Kết thúc đường đôi</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-236-ket-thuc-duong-doi/" class="sign-link-overlay" title="Biển báo W.236 – Kết thúc đường đôi"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w235-duong-doi-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.235 - Đường đôi" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w235-duong-doi-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w235-duong-doi.jpg 324w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.235 – Đường đôi</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-235-duong-doi/" class="sign-link-overlay" title="Biển báo W.235 – Đường đôi"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w234-giao-nhau-voi-duong-hai-chieu-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.234 - Giao nhau với đường hai chiều" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w234-giao-nhau-voi-duong-hai-chieu-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w234-giao-nhau-voi-duong-hai-chieu.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.234 – Giao nhau với đường hai chiều</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-234-giao-nhau-voi-duong-hai-chieu/" class="sign-link-overlay" title="Biển báo W.234 – Giao nhau với đường hai chiều"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w233-nguy-hiem-khac-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.233 - Nguy hiểm khác" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w233-nguy-hiem-khac-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w233-nguy-hiem-khac.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.233 – Nguy hiểm khác</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-233-nguy-hiem-khac/" class="sign-link-overlay" title="Biển báo W.233 – Nguy hiểm khác"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w232-gio-ngang-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.232 - Gió ngang" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w232-gio-ngang-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w232-gio-ngang.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.232 – Gió ngang</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-232-gio-ngang/" class="sign-link-overlay" title="Biển báo W.232 – Gió ngang"></a>',
        },
        {
            image: '<img width="228" height="203" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w231-thu-rung-vuot-qua-duong.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.231 - Thú rừng vượt qua đường" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.231 – Thú rừng vượt qua đường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-231-thu-rung-vuot-qua-duong/" class="sign-link-overlay" title="Biển báo W.231 – Thú rừng vượt qua đường"></a>',
        },
        {
            image: '<img width="229" height="203" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w230-gia-suc.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.230 - Gia súc" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.230 – Gia súc</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-230-gia-suc/" class="sign-link-overlay" title="Biển báo W.230 – Gia súc"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w229-dai-may-bay-len-xuong-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.229 - Dải máy bay lên xuống" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w229-dai-may-bay-len-xuong-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w229-dai-may-bay-len-xuong.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.229 – Dải máy bay lên xuống</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-229-dai-may-bay-len-xuong/" class="sign-link-overlay" title="Biển báo W.229 – Dải máy bay lên xuống"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228d-nen-duong-yeu-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.228d - Nền đường yếu" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228d-nen-duong-yeu-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228d-nen-duong-yeu.jpg 316w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.228d – Nền đường yếu</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-228d-nen-duong-yeu/" class="sign-link-overlay" title="Biển báo W.228d – Nền đường yếu"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228c-soi-da-ban-len-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.228c - Sỏi đá bắn lên" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228c-soi-da-ban-len-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228c-soi-da-ban-len.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.228c – Sỏi đá bắn lên</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-228c-soi-da-ban-len/" class="sign-link-overlay" title="Biển báo W.228c – Sỏi đá bắn lên"></a>',
        },
        {
            image: '<img width="231" height="205" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228b-da-lo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.228b - Đá lở" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.228b – Đá lở</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-228b-da-lo/" class="sign-link-overlay" title="Biển báo W.228b – Đá lở"></a>',
        },
        {
            image: '<img width="233" height="206" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w228a-da-lo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.228a - Đá lở" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.228a – Đá lở</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-228a-da-lo/" class="sign-link-overlay" title="Biển báo W.228a – Đá lở"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w227-cong-truong-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.227 - Công trường" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w227-cong-truong-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w227-cong-truong.jpg 312w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.227 – Công trường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-227-cong-truong/" class="sign-link-overlay" title="Biển báo W.227 – Công trường"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w226-duong-nguoi-di-xe-dap-cat-ngang-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.226 - Đường người đi xe đạp cắt ngang" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w226-duong-nguoi-di-xe-dap-cat-ngang-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w226-duong-nguoi-di-xe-dap-cat-ngang.jpg 311w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.226 – Đường người đi xe đạp cắt ngang</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-226-duong-nguoi-di-xe-dap-cat-ngang/" class="sign-link-overlay" title="Biển báo W.226 – Đường người đi xe đạp cắt ngang"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w225-tre-em-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.225 - Trẻ em" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w225-tre-em-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w225-tre-em.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.225 – Trẻ em</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-225-tre-em/" class="sign-link-overlay" title="Biển báo W.225 – Trẻ em"></a>',
        },
        {
            image: '<img width="300" height="264" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w224-duong-nguoi-di-bo-cat-ngang-300x264.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.224 - Đường người đi bộ cắt ngang" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w224-duong-nguoi-di-bo-cat-ngang-300x264.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w224-duong-nguoi-di-bo-cat-ngang.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.224 – Đường người đi bộ cắt ngang</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-224-duong-nguoi-di-bo-cat-ngang/" class="sign-link-overlay" title="Biển báo W.224 – Đường người đi bộ cắt ngang"></a>',
        },
        {
            image: '<img width="235" height="210" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w223b-vach-nui-nguy-hiem.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.223b - Vách núi nguy hiểm" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.223b – Vách núi nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-223b-vach-nui-nguy-hiem/" class="sign-link-overlay" title="Biển báo W.223b – Vách núi nguy hiểm"></a>',
        },
        {
            image: '<img width="235" height="208" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w223a-vach-nui-nguy-hiem.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.223a - Vách núi nguy hiểm" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.223a – Vách núi nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-223a-vach-nui-nguy-hiem/" class="sign-link-overlay" title="Biển báo W.223a – Vách núi nguy hiểm"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w222b-le-duong-nguy-hiem-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.222b - Lề đường nguy hiểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w222b-le-duong-nguy-hiem-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w222b-le-duong-nguy-hiem.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.222b – Lề đường nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-222b-le-duong-nguy-hiem/" class="sign-link-overlay" title="Biển báo W.222b – Lề đường nguy hiểm"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w222a-duong-tron-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.222a - Đường trơn" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w222a-duong-tron-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w222a-duong-tron.jpg 382w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.222a – Đường trơn</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-222a-duong-tron/" class="sign-link-overlay" title="Biển báo W.222a – Đường trơn"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w221b-duong-khong-bang-phang-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.221b - Đường không bằng phẳng" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w221b-duong-khong-bang-phang-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w221b-duong-khong-bang-phang.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.221b – Đường không bằng phẳng</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-221b-duong-khong-bang-phang/" class="sign-link-overlay" title="Biển báo W.221b – Đường không bằng phẳng"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w221a-duong-khong-bang-phang-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.221a - Đường không bằng phẳng" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w221a-duong-khong-bang-phang-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w221a-duong-khong-bang-phang.jpg 313w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.221a – Đường không bằng phẳng</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-221a-duong-khong-bang-phang/" class="sign-link-overlay" title="Biển báo W.221a – Đường không bằng phẳng"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w220-doc-len-nguy-hiem-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.220 - Dốc lên nguy hiểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w220-doc-len-nguy-hiem-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w220-doc-len-nguy-hiem.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.220 – Dốc lên nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-220-doc-len-nguy-hiem/" class="sign-link-overlay" title="Biển báo W.220 – Dốc lên nguy hiểm"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w219-doc-xuong-nguy-hiem-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.219 - Dốc xuống nguy hiểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w219-doc-xuong-nguy-hiem-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w219-doc-xuong-nguy-hiem.jpg 316w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.219 – Dốc xuống nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-219-doc-xuong-nguy-hiem/" class="sign-link-overlay" title="Biển báo W.219 – Dốc xuống nguy hiểm"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w218-cua-chui-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.218 - Cửa chui" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w218-cua-chui-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w218-cua-chui.jpg 312w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.218 – Cửa chui</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-218-cua-chui/" class="sign-link-overlay" title="Biển báo W.218 – Cửa chui"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w217-ben-pha-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.217 - Bến phà" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w217-ben-pha-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w217-ben-pha.jpg 391w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.217 – Bến phà</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-217-ben-pha/" class="sign-link-overlay" title="Biển báo W.217 – Bến phà"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w216b-duong-ngam-co-nguy-co-lu-quet-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.216b - Đường ngầm có nguy cơ lũ quét" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w216b-duong-ngam-co-nguy-co-lu-quet-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w216b-duong-ngam-co-nguy-co-lu-quet.jpg 312w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.216b – Đường ngầm có nguy cơ lũ quét</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-216b-duong-ngam-co-nguy-co-lu-quet/" class="sign-link-overlay" title="Biển báo W.216b – Đường ngầm có nguy cơ lũ quét"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w216a-duong-ngam-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.216a - Đường ngầm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w216a-duong-ngam-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w216a-duong-ngam.jpg 316w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.216a – Đường ngầm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-216a-duong-ngam/" class="sign-link-overlay" title="Biển báo W.216a – Đường ngầm"></a>',
        },
        {
            image: '<img width="248" height="221" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w215c-ke-vuc-sau-ben-duong-phia-ben-trai.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.215c - Kè, vực sâu bên đường phía bên trái" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.215c – Kè, vực sâu bên đường phía bên trái</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-215c-ke-vuc-sau-ben-duong-phia-ben-trai/" class="sign-link-overlay" title="Biển báo W.215c – Kè, vực sâu bên đường phía bên trái"></a>',
        },
        {
            image: '<img width="250" height="218" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w215b-ke-vuc-sau-ben-duong-phia-ben-phai.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.215b - Kè, vực sâu bên đường phía bên phải" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.215b – Kè, vực sâu bên đường phía bên phải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-215b-ke-vuc-sau-ben-duong-phia-ben-phai/" class="sign-link-overlay" title="Biển báo W.215b – Kè, vực sâu bên đường phía bên phải"></a>',
        },
        {
            image: '<img width="250" height="219" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w215a-ke-vuc-sau-phia-truoc.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.215a - Kè, vực sâu phía trước" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.215a – Kè, vực sâu phía trước</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-215a-ke-vuc-sau-phia-truoc/" class="sign-link-overlay" title="Biển báo W.215a – Kè, vực sâu phía trước"></a>',
        },
        {
            image: '<img width="248" height="221" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w214-cau-quay-cau-cat.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.214 - Cầu quay - cầu cất" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">Biển báo W.214 – Cầu quay – cầu cất</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-214-cau-quay-cau-cat/" class="sign-link-overlay" title="Biển báo W.214 – Cầu quay – cầu cất"></a>',
        },
        {
            image: '<img width="300" height="269" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w213-cau-tam-300x269.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.213 - Cầu tạm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w213-cau-tam-300x269.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w213-cau-tam.jpg 312w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.213 – Cầu tạm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-213-cau-tam/" class="sign-link-overlay" title="Biển báo W.213 – Cầu tạm"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w212-cau-hep-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.212 - Cầu hẹp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w212-cau-hep-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w212-cau-hep.jpg 313w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.212 – Cầu hẹp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-212-cau-hep/" class="sign-link-overlay" title="Biển báo W.212 – Cầu hẹp"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w211b-giao-nhau-voi-duong-tau-dien-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.211b - Giao nhau với đường tàu điện" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w211b-giao-nhau-voi-duong-tau-dien-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w211b-giao-nhau-voi-duong-tau-dien.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.211b – Giao nhau với đường tàu điện</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-211b-giao-nhau-voi-duong-tau-dien/" class="sign-link-overlay" title="Biển báo W.211b – Giao nhau với đường tàu điện"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w211a-giao-nhau-voi-duong-sat-khong-co-rao-chan-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.211a - Giao nhau với đường sắt không có rào chắn" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w211a-giao-nhau-voi-duong-sat-khong-co-rao-chan-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w211a-giao-nhau-voi-duong-sat-khong-co-rao-chan.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.211a – Giao nhau với đường sắt không có rào chắn</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-211a-giao-nhau-voi-duong-sat-khong-co-rao-chan/" class="sign-link-overlay" title="Biển báo W.211a – Giao nhau với đường sắt không có rào chắn"></a>',
        },
        {
            image: '<img width="300" height="263" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w210-giao-nhau-voi-duong-sat-co-rao-chan-300x263.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.210 - Giao nhau với đường sắt có rào chắn" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w210-giao-nhau-voi-duong-sat-co-rao-chan-300x263.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w210-giao-nhau-voi-duong-sat-co-rao-chan.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.210 – Giao nhau với đường sắt có rào chắn</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-210-giao-nhau-voi-duong-sat-co-rao-chan/" class="sign-link-overlay" title="Biển báo W.210 – Giao nhau với đường sắt có rào chắn"></a>',
        },
        {
            image: '<img width="300" height="269" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w209-giao-nhau-co-tin-hieu-den-300x269.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.209 - Giao nhau có tín hiệu đèn" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w209-giao-nhau-co-tin-hieu-den-300x269.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w209-giao-nhau-co-tin-hieu-den.jpg 312w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.209 – Giao nhau có tín hiệu đèn</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-209-giao-nhau-co-tin-hieu-den/" class="sign-link-overlay" title="Biển báo W.209 – Giao nhau có tín hiệu đèn"></a>',
        },
        {
            image: '<img width="300" height="263" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w208-giao-nhau-voi-duong-uu-tien-duong-chinh-300x263.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.208 - Giao nhau với đường ưu tiên (đường chính)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w208-giao-nhau-voi-duong-uu-tien-duong-chinh-300x263.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w208-giao-nhau-voi-duong-uu-tien-duong-chinh.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.208 – Giao nhau với đường ưu tiên (đường chính)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-208-giao-nhau-voi-duong-uu-tien-duong-chinh/" class="sign-link-overlay" title="Biển báo W.208 – Giao nhau với đường ưu tiên (đường chính)"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207l-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207l - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207l-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207l-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 313w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207l – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207l-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207l – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207k-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207k - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207k-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207k-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207k – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207k-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207k – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207i-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207i - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207i-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207i-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 313w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207i – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207i-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207i – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207h-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207h - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207h-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207h-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207h – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207h-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207h – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207g-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207g - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207g-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207g-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207g – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207g-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207g – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207f-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207f - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207f-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207f-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207f – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207f-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207f – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="264" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207e-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x264.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207e - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207e-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x264.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207e-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 511w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207e – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207e-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207e – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207d-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207d - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207d-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207d-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 313w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207d – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207d-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207d – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207c-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207c - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207c-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207c-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207c – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207c-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207c – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="270" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207b-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x270.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207b - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207b-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x270.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207b-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 313w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207b – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207b-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207b – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="266" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207a-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x266.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.207a - Giao nhau với đường không ưu tiên (đường nhánh)" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207a-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh-300x266.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w207a-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.207a – Giao nhau với đường không ưu tiên (đường nhánh)</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-207a-giao-nhau-voi-duong-khong-uu-tien-duong-nhanh/" class="sign-link-overlay" title="Biển báo W.207a – Giao nhau với đường không ưu tiên (đường nhánh)"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w206-giao-nhau-chay-theo-vong-xuyen-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.206 - Giao nhau chạy theo vòng xuyến" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w206-giao-nhau-chay-theo-vong-xuyen-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w206-giao-nhau-chay-theo-vong-xuyen.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.206 – Giao nhau chạy theo vòng xuyến</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-206-giao-nhau-chay-theo-vong-xuyen/" class="sign-link-overlay" title="Biển báo W.206 – Giao nhau chạy theo vòng xuyến"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205e-duong-giao-nhau-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.205e - Đường giao nhau" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205e-duong-giao-nhau-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205e-duong-giao-nhau.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.205e – Đường giao nhau</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-205e-duong-giao-nhau/" class="sign-link-overlay" title="Biển báo W.205e – Đường giao nhau"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205d-duong-giao-nhau-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.205d - Đường giao nhau" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205d-duong-giao-nhau-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205d-duong-giao-nhau.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.205d – Đường giao nhau</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-205d-duong-giao-nhau/" class="sign-link-overlay" title="Biển báo W.205d – Đường giao nhau"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205c-duong-giao-nhau-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.205c - Đường giao nhau" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205c-duong-giao-nhau-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205c-duong-giao-nhau.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.205c – Đường giao nhau</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-205c-duong-giao-nhau/" class="sign-link-overlay" title="Biển báo W.205c – Đường giao nhau"></a>',
        },
        {
            image: '<img width="300" height="269" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205b-duong-giao-nhau-300x269.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.205b - Đường giao nhau" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205b-duong-giao-nhau-300x269.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205b-duong-giao-nhau.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.205b – Đường giao nhau</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-205b-duong-giao-nhau/" class="sign-link-overlay" title="Biển báo W.205b – Đường giao nhau"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205a-duong-giao-nhau-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.205a - Đường giao nhau" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205a-duong-giao-nhau-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w205a-duong-giao-nhau.jpg 316w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.205a – Đường giao nhau</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-205a-duong-giao-nhau/" class="sign-link-overlay" title="Biển báo W.205a – Đường giao nhau"></a>',
        },
        {
            image: '<img width="300" height="267" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w204-duong-hai-chieu-300x267.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.204 - Đường hai chiều" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w204-duong-hai-chieu-300x267.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w204-duong-hai-chieu.jpg 317w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.204 – Đường hai chiều</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-204-duong-hai-chieu/" class="sign-link-overlay" title="Biển báo W.204 – Đường hai chiều"></a>',
        },
        {
            image: '<img width="300" height="269" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203c-duong-bi-thu-hep-300x269.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.203c - Đường bị thu hẹp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203c-duong-bi-thu-hep-300x269.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203c-duong-bi-thu-hep.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.203c – Đường bị thu hẹp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-203c-duong-bi-thu-hep/" class="sign-link-overlay" title="Biển báo W.203c – Đường bị thu hẹp"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203b-duong-bi-thu-hep-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.203b - Đường bị thu hẹp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203b-duong-bi-thu-hep-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203b-duong-bi-thu-hep.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.203b – Đường bị thu hẹp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-203b-duong-bi-thu-hep/" class="sign-link-overlay" title="Biển báo W.203b – Đường bị thu hẹp"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203a-duong-bi-thu-hep-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.203a - Đường bị thu hẹp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203a-duong-bi-thu-hep-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w203a-duong-bi-thu-hep.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.203a – Đường bị thu hẹp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-203a-duong-bi-thu-hep/" class="sign-link-overlay" title="Biển báo W.203a – Đường bị thu hẹp"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w202b-nhieu-cho-ngoat-nguy-hiem-lien-tiep-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.202b - Nhiều chỗ ngoặt nguy hiểm liên tiếp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w202b-nhieu-cho-ngoat-nguy-hiem-lien-tiep-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w202b-nhieu-cho-ngoat-nguy-hiem-lien-tiep.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.202b – Nhiều chỗ ngoặt nguy hiểm liên tiếp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-202b-nhieu-cho-ngoat-nguy-hiem-lien-tiep/" class="sign-link-overlay" title="Biển báo W.202b – Nhiều chỗ ngoặt nguy hiểm liên tiếp"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w202a-nhieu-cho-ngoat-nguy-hiem-lien-tiep-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.202a - Nhiều chỗ ngoặt nguy hiểm liên tiếp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w202a-nhieu-cho-ngoat-nguy-hiem-lien-tiep-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w202a-nhieu-cho-ngoat-nguy-hiem-lien-tiep.jpg 315w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.202a – Nhiều chỗ ngoặt nguy hiểm liên tiếp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-202a-nhieu-cho-ngoat-nguy-hiem-lien-tiep/" class="sign-link-overlay" title="Biển báo W.202a – Nhiều chỗ ngoặt nguy hiểm liên tiếp"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201d-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.201d - Chỗ ngoặt nguy hiểm có nguy cơ lật xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201d-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201d-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe.jpg 316w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.201d – Chỗ ngoặt nguy hiểm có nguy cơ lật xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-201d-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe/" class="sign-link-overlay" title="Biển báo W.201d – Chỗ ngoặt nguy hiểm có nguy cơ lật xe"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201c-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.201c - Chỗ ngoặt nguy hiểm có nguy cơ lật xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201c-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201c-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.201c – Chỗ ngoặt nguy hiểm có nguy cơ lật xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-201c-cho-ngoat-nguy-hiem-co-nguy-co-lat-xe/" class="sign-link-overlay" title="Biển báo W.201c – Chỗ ngoặt nguy hiểm có nguy cơ lật xe"></a>',
        },
        {
            image: '<img width="300" height="265" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201b-cho-ngoat-nguy-hiem-300x265.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.201b - Chỗ ngoặt nguy hiểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201b-cho-ngoat-nguy-hiem-300x265.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201b-cho-ngoat-nguy-hiem.jpg 316w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.201b – Chỗ ngoặt nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-201b-cho-ngoat-nguy-hiem/" class="sign-link-overlay" title="Biển báo W.201b – Chỗ ngoặt nguy hiểm"></a>',
        },
        {
            image: '<img width="300" height="268" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201a-cho-ngoat-nguy-hiem-300x268.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo W.201a - Chỗ ngoặt nguy hiểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201a-cho-ngoat-nguy-hiem-300x268.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-w201a-cho-ngoat-nguy-hiem.jpg 314w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo W.201a – Chỗ ngoặt nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-w-201a-cho-ngoat-nguy-hiem/" class="sign-link-overlay" title="Biển báo W.201a – Chỗ ngoặt nguy hiểm"></a>',
        },
        {
            image: '<img width="222" height="222" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p140-cam-xe-cong-nong-va-cac-loai-xe-tuong-tu.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.140 - Cấm xe công nông và các loại xe tương tự" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p140-cam-xe-cong-nong-va-cac-loai-xe-tuong-tu.jpg 222w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p140-cam-xe-cong-nong-va-cac-loai-xe-tuong-tu-150x150.jpg 150w" sizes="auto, (max-width: 222px) 100vw, 222px" />',
            name_description_code: '<p class="sign-name">Biển báo P.140 – Cấm xe công nông và các loại xe tương tự</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-140-cam-xe-cong-nong-va-cac-loai-xe-tuong-tu/" class="sign-link-overlay" title="Biển báo P.140 – Cấm xe công nông và các loại xe tương tự"></a>',
        },
        {
            image: '<img width="298" height="297" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p139-cam-di-thang-re-phai.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.139 - Cấm đi thẳng, rẽ phải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p139-cam-di-thang-re-phai.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p139-cam-di-thang-re-phai-150x150.jpg 150w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo P.139 – Cấm đi thẳng, rẽ phải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-139-cam-di-thang-re-phai/" class="sign-link-overlay" title="Biển báo P.139 – Cấm đi thẳng, rẽ phải"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p138-cam-di-thang-re-trai-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.138 - Cấm đi thẳng, rẽ trái" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p138-cam-di-thang-re-trai-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p138-cam-di-thang-re-trai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p138-cam-di-thang-re-trai.jpg 322w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo P.138 – Cấm đi thẳng, rẽ trái</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-138-cam-di-thang-re-trai/" class="sign-link-overlay" title="Biển báo P.138 – Cấm đi thẳng, rẽ trái"></a>',
        },
        {
            image: '<img width="284" height="284" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p137-cam-re-trai-re-phai.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.137 - Cấm rẽ trái, rẽ phải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p137-cam-re-trai-re-phai.jpg 284w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p137-cam-re-trai-re-phai-150x150.jpg 150w" sizes="auto, (max-width: 284px) 100vw, 284px" />',
            name_description_code: '<p class="sign-name">Biển báo P.137 – Cấm rẽ trái, rẽ phải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-137-cam-re-trai-re-phai/" class="sign-link-overlay" title="Biển báo P.137 – Cấm rẽ trái, rẽ phải"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p136-cam-di-thang-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.136 - Cấm đi thẳng" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p136-cam-di-thang-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p136-cam-di-thang-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p136-cam-di-thang.jpg 328w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.136 – Cấm đi thẳng</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-136-cam-di-thang/" class="sign-link-overlay" title="Biển báo P.136 – Cấm đi thẳng"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp135-het-tat-ca-cac-lenh-cam-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo DP.135 - Hết tất cả các lệnh cấm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp135-het-tat-ca-cac-lenh-cam-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp135-het-tat-ca-cac-lenh-cam-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp135-het-tat-ca-cac-lenh-cam.jpg 327w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo DP.135 – Hết tất cả các lệnh cấm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-dp-135-het-tat-ca-cac-lenh-cam/" class="sign-link-overlay" title="Biển báo DP.135 – Hết tất cả các lệnh cấm"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp134-het-toc-do-toi-da-cho-phep-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo DP.134 - Hết tốc độ tối đa cho phép" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp134-het-toc-do-toi-da-cho-phep-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp134-het-toc-do-toi-da-cho-phep-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp134-het-toc-do-toi-da-cho-phep.jpg 302w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo DP.134 – Hết tốc độ tối đa cho phép</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-dp-134-het-toc-do-toi-da-cho-phep/" class="sign-link-overlay" title="Biển báo DP.134 – Hết tốc độ tối đa cho phép"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp133-het-cam-vuot-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo DP.133 - Hết cấm vượt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp133-het-cam-vuot-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp133-het-cam-vuot-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp133-het-cam-vuot.jpg 305w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo DP.133 – Hết cấm vượt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-dp-133-het-cam-vuot/" class="sign-link-overlay" title="Biển báo DP.133 – Hết cấm vượt"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p132-nhuong-duong-cho-xe-co-gioi-di-nguoc-chieu-qua-duong-hep-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.132 - Nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p132-nhuong-duong-cho-xe-co-gioi-di-nguoc-chieu-qua-duong-hep-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p132-nhuong-duong-cho-xe-co-gioi-di-nguoc-chieu-qua-duong-hep-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p132-nhuong-duong-cho-xe-co-gioi-di-nguoc-chieu-qua-duong-hep.jpg 326w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.132 – Nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-132-nhuong-duong-cho-xe-co-gioi-di-nguoc-chieu-qua-duong-hep/" class="sign-link-overlay" title="Biển báo P.132 – Nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131c-cam-do-xe-ngay-chan-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.131c - Cấm đỗ xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131c-cam-do-xe-ngay-chan-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131c-cam-do-xe-ngay-chan-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131c-cam-do-xe-ngay-chan.jpg 304w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.131c – Cấm đỗ xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-131c-cam-do-xe/" class="sign-link-overlay" title="Biển báo P.131c – Cấm đỗ xe"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131b-cam-do-xe-ngay-le-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.131b - Cấm đỗ xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131b-cam-do-xe-ngay-le-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131b-cam-do-xe-ngay-le-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131b-cam-do-xe-ngay-le.jpg 308w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.131b – Cấm đỗ xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-131b-cam-do-xe/" class="sign-link-overlay" title="Biển báo P.131b – Cấm đỗ xe"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131a-cam-do-xe-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.131a - Cấm đỗ xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131a-cam-do-xe-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131a-cam-do-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p131a-cam-do-xe.jpg 329w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.131a – Cấm đỗ xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-131a-cam-do-xe/" class="sign-link-overlay" title="Biển báo P.131a – Cấm đỗ xe"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p130-cam-dung-xe-va-do-xe-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.130 - Cấm dừng xe và đỗ xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p130-cam-dung-xe-va-do-xe-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p130-cam-dung-xe-va-do-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p130-cam-dung-xe-va-do-xe.jpg 329w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.130 – Cấm dừng xe và đỗ xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-130-cam-dung-xe-va-do-xe/" class="sign-link-overlay" title="Biển báo P.130 – Cấm dừng xe và đỗ xe"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p129-kiem-tra-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.129 - Kiểm tra" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p129-kiem-tra-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p129-kiem-tra-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p129-kiem-tra.jpg 331w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.129 – Kiểm tra</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-129-kiem-tra/" class="sign-link-overlay" title="Biển báo P.129 – Kiểm tra"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p128-cam-su-dung-coi-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.128 - Cấm sử dụng còi" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p128-cam-su-dung-coi-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p128-cam-su-dung-coi-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p128-cam-su-dung-coi.jpg 331w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.128 – Cấm sử dụng còi</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-128-cam-su-dung-coi/" class="sign-link-overlay" title="Biển báo P.128 – Cấm sử dụng còi"></a>',
        },
        {
            image: '<img width="300" height="261" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127c-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-300x261.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo DP.127c - Biển hết tốc độ tối đa cho phép theo biển ghép" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127c-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-300x261.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127c-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-1024x891.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127c-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-768x668.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127c-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep.jpg 1280w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo DP.127c – Biển hết tốc độ tối đa cho phép theo biển ghép</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-dp-127c-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep/" class="sign-link-overlay" title="Biển báo DP.127c – Biển hết tốc độ tối đa cho phép theo biển ghép"></a>',
        },
        {
            image: '<img width="283" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127b-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-283x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo DP.127b - Biển hết tốc độ tối đa cho phép theo biển ghép" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127b-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-283x300.jpg 283w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127b-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep.jpg 493w" sizes="auto, (max-width: 283px) 100vw, 283px" />',
            name_description_code: '<p class="sign-name">Biển báo DP.127b – Biển hết tốc độ tối đa cho phép theo biển ghép</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-dp-127b-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep/" class="sign-link-overlay" title="Biển báo DP.127b – Biển hết tốc độ tối đa cho phép theo biển ghép"></a>',
        },
        {
            image: '<img width="300" height="259" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127a-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-300x259.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo DP.127a - Biển hết tốc độ tối đa cho phép theo biển ghép" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127a-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep-300x259.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-dp127a-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep.jpg 494w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo DP.127a – Biển hết tốc độ tối đa cho phép theo biển ghép</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-dp-127a-bien-het-toc-do-toi-da-cho-phep-theo-bien-ghep/" class="sign-link-overlay" title="Biển báo DP.127a – Biển hết tốc độ tối đa cho phép theo biển ghép"></a>',
        },
        {
            image: '<img width="300" height="259" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127c-bien-ghep-toc-do-toi-da-cho-phep-theo-phuong-tien-tren-tung-lan-duong-300x259.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.127c - Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127c-bien-ghep-toc-do-toi-da-cho-phep-theo-phuong-tien-tren-tung-lan-duong-300x259.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127c-bien-ghep-toc-do-toi-da-cho-phep-theo-phuong-tien-tren-tung-lan-duong.jpg 488w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.127c – Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-127c-bien-ghep-toc-do-toi-da-cho-phep-theo-phuong-tien-tren-tung-lan-duong/" class="sign-link-overlay" title="Biển báo P.127c – Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường"></a>',
        },
        {
            image: '<img width="284" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127b-bien-ghep-toc-do-toi-da-cho-phep-tren-tung-lan-duong-284x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.127b - Biển ghép tốc độ tối đa cho phép trên từng làn đường" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127b-bien-ghep-toc-do-toi-da-cho-phep-tren-tung-lan-duong-284x300.jpg 284w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127b-bien-ghep-toc-do-toi-da-cho-phep-tren-tung-lan-duong.jpg 447w" sizes="auto, (max-width: 284px) 100vw, 284px" />',
            name_description_code: '<p class="sign-name">Biển báo P.127b – Biển ghép tốc độ tối đa cho phép trên từng làn đường</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-127b-bien-ghep-toc-do-toi-da-cho-phep-tren-tung-lan-duong/" class="sign-link-overlay" title="Biển báo P.127b – Biển ghép tốc độ tối đa cho phép trên từng làn đường"></a>',
        },
        {
            image: '<img width="225" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127a-toc-do-toi-da-cho-phep-ve-ban-dem-225x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.127a - Tốc độ tối đa cho phép về ban đêm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127a-toc-do-toi-da-cho-phep-ve-ban-dem-225x300.jpg 225w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p127a-toc-do-toi-da-cho-phep-ve-ban-dem.jpg 404w" sizes="auto, (max-width: 225px) 100vw, 225px" />',
            name_description_code: '<p class="sign-name">Biển báo P.127a – Tốc độ tối đa cho phép về ban đêm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-127a-toc-do-toi-da-cho-phep-ve-ban-dem/" class="sign-link-overlay" title="Biển báo P.127a – Tốc độ tối đa cho phép về ban đêm"></a>',
        },
        {
            image: '<img width="274" height="276" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p126-cam-xe-oto-tai-vuot.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.126 - Cấm xe ôtô tải vượt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p126-cam-xe-oto-tai-vuot.jpg 274w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p126-cam-xe-oto-tai-vuot-150x150.jpg 150w" sizes="auto, (max-width: 274px) 100vw, 274px" />',
            name_description_code: '<p class="sign-name">Biển báo P.126 – Cấm xe ôtô tải vượt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-126-cam-xe-oto-tai-vuot/" class="sign-link-overlay" title="Biển báo P.126 – Cấm xe ôtô tải vượt"></a>',
        },
        {
            image: '<img width="276" height="277" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p125-cam-vuot.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.125 - Cấm vượt" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p125-cam-vuot.jpg 276w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p125-cam-vuot-150x150.jpg 150w" sizes="auto, (max-width: 276px) 100vw, 276px" />',
            name_description_code: '<p class="sign-name">Biển báo P.125 – Cấm vượt</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-125-cam-vuot/" class="sign-link-overlay" title="Biển báo P.125 – Cấm vượt"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124f-cam-oto-re-phai-va-quay-dau-xe-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.124f - Cấm ôtô rẽ phải và quay đầu xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124f-cam-oto-re-phai-va-quay-dau-xe-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124f-cam-oto-re-phai-va-quay-dau-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124f-cam-oto-re-phai-va-quay-dau-xe.jpg 502w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.124f – Cấm ôtô rẽ phải và quay đầu xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-124f-cam-oto-re-phai-va-quay-dau-xe/" class="sign-link-overlay" title="Biển báo P.124f – Cấm ôtô rẽ phải và quay đầu xe"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124e-cam-oto-re-trai-va-quay-dau-xe-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.124e - Cấm ôtô rẽ trái và quay đầu xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124e-cam-oto-re-trai-va-quay-dau-xe-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124e-cam-oto-re-trai-va-quay-dau-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124e-cam-oto-re-trai-va-quay-dau-xe.jpg 464w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo P.124e – Cấm ôtô rẽ trái và quay đầu xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-124e-cam-oto-re-trai-va-quay-dau-xe/" class="sign-link-overlay" title="Biển báo P.124e – Cấm ôtô rẽ trái và quay đầu xe"></a>',
        },
        {
            image: '<img width="297" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124d-cam-re-phai-va-quay-dau-xe-297x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.124d - Cấm rẽ phải và quay đầu xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124d-cam-re-phai-va-quay-dau-xe-297x300.jpg 297w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124d-cam-re-phai-va-quay-dau-xe.jpg 475w" sizes="auto, (max-width: 297px) 100vw, 297px" />',
            name_description_code: '<p class="sign-name">Biển báo P.124d – Cấm rẽ phải và quay đầu xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-124d-cam-re-phai-va-quay-dau-xe/" class="sign-link-overlay" title="Biển báo P.124d – Cấm rẽ phải và quay đầu xe"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124c-cam-re-trai-va-quay-dau-xe-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.124c - Cấm rẽ trái và quay đầu xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124c-cam-re-trai-va-quay-dau-xe-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124c-cam-re-trai-va-quay-dau-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124c-cam-re-trai-va-quay-dau-xe.jpg 474w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.124c – Cấm rẽ trái và quay đầu xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-124c-cam-re-trai-va-quay-dau-xe/" class="sign-link-overlay" title="Biển báo P.124c – Cấm rẽ trái và quay đầu xe"></a>',
        },
        {
            image: '<img width="300" height="141" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124b-cam-quay-dau-xe-300x141.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.124b - Cấm quay đầu xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124b-cam-quay-dau-xe-300x141.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124b-cam-quay-dau-xe-768x361.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124b-cam-quay-dau-xe.jpg 1018w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.124b – Cấm quay đầu xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-124b-cam-quay-dau-xe/" class="sign-link-overlay" title="Biển báo P.124b – Cấm quay đầu xe"></a>',
        },
        {
            image: '<img width="300" height="139" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124a-cam-quay-dau-xe-300x139.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.124a - Cấm quay đầu xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124a-cam-quay-dau-xe-300x139.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124a-cam-quay-dau-xe-1024x476.jpg 1024w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124a-cam-quay-dau-xe-768x357.jpg 768w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p124a-cam-quay-dau-xe.jpg 1046w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.124a – Cấm quay đầu xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-124a-cam-quay-dau-xe/" class="sign-link-overlay" title="Biển báo P.124a – Cấm quay đầu xe"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123b-cam-re-phai-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.123b - Cấm rẽ phải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123b-cam-re-phai-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123b-cam-re-phai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123b-cam-re-phai.jpg 346w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo P.123b – Cấm rẽ phải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-123b-cam-re-phai/" class="sign-link-overlay" title="Biển báo P.123b – Cấm rẽ phải"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123a-cam-re-trai-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.123a - Cấm rẽ trái" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123a-cam-re-trai-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123a-cam-re-trai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p123a-cam-re-trai.jpg 395w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.123a – Cấm rẽ trái</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-123a-cam-re-trai/" class="sign-link-overlay" title="Biển báo P.123a – Cấm rẽ trái"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p121-cu-ly-toi-thieu-giua-hai-xe-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.121 - Cự ly tối thiểu giữa hai xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p121-cu-ly-toi-thieu-giua-hai-xe-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p121-cu-ly-toi-thieu-giua-hai-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p121-cu-ly-toi-thieu-giua-hai-xe.jpg 334w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo P.121 – Cự ly tối thiểu giữa hai xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-121-cu-ly-toi-thieu-giua-hai-xe/" class="sign-link-overlay" title="Biển báo P.121 – Cự ly tối thiểu giữa hai xe"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p120-han-che-chieu-dai-xe-co-gioi-keo-theo-ro-mooc-hoac-so-mi-ro-mooc-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.120 - Hạn chế chiều dài xe cơ giới kéo theo rơ-moóc hoặc sơ-mi rơ-moóc" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p120-han-che-chieu-dai-xe-co-gioi-keo-theo-ro-mooc-hoac-so-mi-ro-mooc-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p120-han-che-chieu-dai-xe-co-gioi-keo-theo-ro-mooc-hoac-so-mi-ro-mooc-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p120-han-che-chieu-dai-xe-co-gioi-keo-theo-ro-mooc-hoac-so-mi-ro-mooc.jpg 351w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">moóc hoặc sơ-mi rơ-moóc</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-120-han-che-chieu-dai-xe-co-gioi-keo-theo-ro-mooc-hoac-so-mi-ro-mooc/" class="sign-link-overlay" title="Biển báo P.120 – Hạn chế chiều dài xe cơ giới kéo theo rơ-moóc hoặc sơ-mi rơ-moóc"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p119-han-che-chieu-dai-xe-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.119 - Hạn chế chiều dài xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p119-han-che-chieu-dai-xe-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p119-han-che-chieu-dai-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p119-han-che-chieu-dai-xe.jpg 402w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.119 – Hạn chế chiều dài xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-119-han-che-chieu-dai-xe/" class="sign-link-overlay" title="Biển báo P.119 – Hạn chế chiều dài xe"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p118-han-che-chieu-ngang-xe-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.118 - Hạn chế chiều ngang xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p118-han-che-chieu-ngang-xe-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p118-han-che-chieu-ngang-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p118-han-che-chieu-ngang-xe.jpg 336w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.118 – Hạn chế chiều ngang xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-118-han-che-chieu-ngang-xe/" class="sign-link-overlay" title="Biển báo P.118 – Hạn chế chiều ngang xe"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p117-han-che-chieu-cao-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.117 - Hạn chế chiều cao" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p117-han-che-chieu-cao-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p117-han-che-chieu-cao-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p117-han-che-chieu-cao.jpg 359w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.117 – Hạn chế chiều cao</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-117-han-che-chieu-cao/" class="sign-link-overlay" title="Biển báo P.117 – Hạn chế chiều cao"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p116-han-che-tai-trong-tren-truc-xe-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.116 - Hạn chế tải trọng trên trục xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p116-han-che-tai-trong-tren-truc-xe-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p116-han-che-tai-trong-tren-truc-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p116-han-che-tai-trong-tren-truc-xe.jpg 358w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.116 – Hạn chế tải trọng trên trục xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-116-han-che-tai-trong-tren-truc-xe/" class="sign-link-overlay" title="Biển báo P.116 – Hạn chế tải trọng trên trục xe"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p115-han-che-trong-tai-toan-bo-xe-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.115 - Hạn chế trọng tải toàn bộ xe" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p115-han-che-trong-tai-toan-bo-xe-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p115-han-che-trong-tai-toan-bo-xe-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p115-han-che-trong-tai-toan-bo-xe.jpg 331w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.115 – Hạn chế trọng tải toàn bộ xe</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-115-han-che-trong-tai-toan-bo-xe/" class="sign-link-overlay" title="Biển báo P.115 – Hạn chế trọng tải toàn bộ xe"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p114-cam-xe-suc-vat-keo-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.114 - Cấm xe súc vật kéo" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p114-cam-xe-suc-vat-keo-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p114-cam-xe-suc-vat-keo-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p114-cam-xe-suc-vat-keo.jpg 332w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.114 – Cấm xe súc vật kéo</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-114-cam-xe-suc-vat-keo/" class="sign-link-overlay" title="Biển báo P.114 – Cấm xe súc vật kéo"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p113-cam-xe-nguoi-keo-day-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.113 - Cấm xe người kéo, đẩy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p113-cam-xe-nguoi-keo-day-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p113-cam-xe-nguoi-keo-day-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p113-cam-xe-nguoi-keo-day.jpg 332w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.113 – Cấm xe người kéo, đẩy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-113-cam-xe-nguoi-keo-day/" class="sign-link-overlay" title="Biển báo P.113 – Cấm xe người kéo, đẩy"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p112-cam-nguoi-di-bo-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.112 - Cấm người đi bộ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p112-cam-nguoi-di-bo-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p112-cam-nguoi-di-bo-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p112-cam-nguoi-di-bo.jpg 335w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.112 – Cấm người đi bộ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-112-cam-nguoi-di-bo/" class="sign-link-overlay" title="Biển báo P.112 – Cấm người đi bộ"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111d-cam-xe-ba-banh-loai-khong-co-dong-co-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.111d - Cấm xe ba bánh loại không có động cơ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111d-cam-xe-ba-banh-loai-khong-co-dong-co-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111d-cam-xe-ba-banh-loai-khong-co-dong-co-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111d-cam-xe-ba-banh-loai-khong-co-dong-co.jpg 334w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo P.111d – Cấm xe ba bánh loại không có động cơ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-111d-cam-xe-ba-banh-loai-khong-co-dong-co/" class="sign-link-overlay" title="Biển báo P.111d – Cấm xe ba bánh loại không có động cơ"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111c-cam-xe-ba-banh-loai-co-dong-co-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.111c - Cấm xe ba bánh loại có động cơ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111c-cam-xe-ba-banh-loai-co-dong-co-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111c-cam-xe-ba-banh-loai-co-dong-co-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p111c-cam-xe-ba-banh-loai-co-dong-co.jpg 334w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.111c – Cấm xe ba bánh loại có động cơ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-111c-cam-xe-ba-banh-loai-co-dong-co/" class="sign-link-overlay" title="Biển báo P.111c – Cấm xe ba bánh loại có động cơ"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111b-cam-xe-ba-banh-loai-co-dong-co-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.111b - Cấm xe ba bánh loại có động cơ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111b-cam-xe-ba-banh-loai-co-dong-co-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111b-cam-xe-ba-banh-loai-co-dong-co-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111b-cam-xe-ba-banh-loai-co-dong-co.jpg 338w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.111b – Cấm xe ba bánh loại có động cơ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-111b-cam-xe-ba-banh-loai-co-dong-co/" class="sign-link-overlay" title="Biển báo P.111b – Cấm xe ba bánh loại có động cơ"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111a-cam-xe-gan-may-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.111a - Cấm xe gắn máy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111a-cam-xe-gan-may-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111a-cam-xe-gan-may-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p111a-cam-xe-gan-may.jpg 373w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.111a – Cấm xe gắn máy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-111a-cam-xe-gan-may/" class="sign-link-overlay" title="Biển báo P.111a – Cấm xe gắn máy"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110b-cam-xe-dap-tho-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.110b - Cấm xe đạp thồ" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110b-cam-xe-dap-tho-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110b-cam-xe-dap-tho-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110b-cam-xe-dap-tho.jpg 340w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.110b – Cấm xe đạp thồ</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-110b-cam-xe-dap-tho/" class="sign-link-overlay" title="Biển báo P.110b – Cấm xe đạp thồ"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110a-cam-xe-dap-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.110a - Cấm xe đạp" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110a-cam-xe-dap-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110a-cam-xe-dap-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p110a-cam-xe-dap.jpg 344w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.110a – Cấm xe đạp</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-110a-cam-xe-dap/" class="sign-link-overlay" title="Biển báo P.110a – Cấm xe đạp"></a>',
        },
        {
            image: '<img width="260" height="260" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p109-cam-may-keo.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.109 - Cấm máy kéo" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p109-cam-may-keo.jpg 260w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p109-cam-may-keo-150x150.jpg 150w" sizes="auto, (max-width: 260px) 100vw, 260px" />',
            name_description_code: '<p class="sign-name">Biển báo P.109 – Cấm máy kéo</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-109-cam-may-keo/" class="sign-link-overlay" title="Biển báo P.109 – Cấm máy kéo"></a>',
        },
        {
            image: '<img width="287" height="284" src="https://laihay.vn/wp-content/uploads/2025/05/bien-bao-p108a-cam-xe-so-mi-ro-mooc.png" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.108a - Cấm xe sơ-mi rơ-moóc" decoding="async" loading="lazy" />',
            name_description_code: '<p class="sign-name">mi rơ-moóc</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-108a-cam-xe-so-mi-ro-mooc/" class="sign-link-overlay" title="Biển báo P.108a – Cấm xe sơ-mi rơ-moóc"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p108-cam-xe-keo-ro-mooc-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.108 - Cấm xe kéo rơ-moóc" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p108-cam-xe-keo-ro-mooc-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p108-cam-xe-keo-ro-mooc-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p108-cam-xe-keo-ro-mooc.jpg 342w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">moóc</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-108-cam-xe-keo-ro-mooc/" class="sign-link-overlay" title="Biển báo P.108 – Cấm xe kéo rơ-moóc"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107b-cam-xe-oto-taxi-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.107b - Cấm xe ôtô taxi" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107b-cam-xe-oto-taxi-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107b-cam-xe-oto-taxi-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107b-cam-xe-oto-taxi.jpg 408w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.107b – Cấm xe ôtô taxi</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-107b-cam-xe-oto-taxi/" class="sign-link-overlay" title="Biển báo P.107b – Cấm xe ôtô taxi"></a>',
        },
        {
            image: '<img width="291" height="291" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107a-cam-xe-oto-khach.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.107a - Cấm xe ôtô khách" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107a-cam-xe-oto-khach.jpg 291w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107a-cam-xe-oto-khach-150x150.jpg 150w" sizes="auto, (max-width: 291px) 100vw, 291px" />',
            name_description_code: '<p class="sign-name">Biển báo P.107a – Cấm xe ôtô khách</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-107a-cam-xe-oto-khach/" class="sign-link-overlay" title="Biển báo P.107a – Cấm xe ôtô khách"></a>',
        },
        {
            image: '<img width="300" height="297" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107-cam-xe-oto-khach-va-xe-oto-tai-300x297.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.107 - Cấm xe ôtô khách và xe ôtô tải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107-cam-xe-oto-khach-va-xe-oto-tai-300x297.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107-cam-xe-oto-khach-va-xe-oto-tai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p107-cam-xe-oto-khach-va-xe-oto-tai.jpg 346w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.107 – Cấm xe ôtô khách và xe ôtô tải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-107-cam-xe-oto-khach-va-xe-oto-tai/" class="sign-link-overlay" title="Biển báo P.107 – Cấm xe ôtô khách và xe ôtô tải"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106c-cam-cac-xe-cho-hang-nguy-hiem-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.106c - Cấm các xe chở hàng nguy hiểm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106c-cam-cac-xe-cho-hang-nguy-hiem-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106c-cam-cac-xe-cho-hang-nguy-hiem-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106c-cam-cac-xe-cho-hang-nguy-hiem.jpg 341w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.106c – Cấm các xe chở hàng nguy hiểm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-106c-cam-cac-xe-cho-hang-nguy-hiem/" class="sign-link-overlay" title="Biển báo P.106c – Cấm các xe chở hàng nguy hiểm"></a>',
        },
        {
            image: '<img width="300" height="298" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106b-cam-xe-oto-tai-300x298.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.106b - Cấm xe ôtô tải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106b-cam-xe-oto-tai-300x298.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106b-cam-xe-oto-tai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106b-cam-xe-oto-tai.jpg 343w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.106b – Cấm xe ôtô tải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-106b-cam-xe-oto-tai/" class="sign-link-overlay" title="Biển báo P.106b – Cấm xe ôtô tải"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106a-cam-xe-oto-tai-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.106a - Cấm xe ôtô tải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106a-cam-xe-oto-tai-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106a-cam-xe-oto-tai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p106a-cam-xe-oto-tai.jpg 342w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.106a – Cấm xe ôtô tải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-106a-cam-xe-oto-tai/" class="sign-link-overlay" title="Biển báo P.106a – Cấm xe ôtô tải"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p105-cam-xe-oto-va-xe-may-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.105 - Cấm xe ôtô và xe máy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p105-cam-xe-oto-va-xe-may-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p105-cam-xe-oto-va-xe-may-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p105-cam-xe-oto-va-xe-may.jpg 343w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.105 – Cấm xe ôtô và xe máy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-105-cam-xe-oto-va-xe-may/" class="sign-link-overlay" title="Biển báo P.105 – Cấm xe ôtô và xe máy"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p104-cam-xe-may-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.104 - Cấm xe máy" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p104-cam-xe-may-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p104-cam-xe-may-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p104-cam-xe-may.jpg 343w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.104 – Cấm xe máy</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-104-cam-xe-may/" class="sign-link-overlay" title="Biển báo P.104 – Cấm xe máy"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103c-cam-xe-oto-re-trai-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.103c - Cấm xe ôtô rẽ trái" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103c-cam-xe-oto-re-trai-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103c-cam-xe-oto-re-trai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103c-cam-xe-oto-re-trai.jpg 343w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.103c – Cấm xe ôtô rẽ trái</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-103c-cam-xe-oto-re-trai/" class="sign-link-overlay" title="Biển báo P.103c – Cấm xe ôtô rẽ trái"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103b-cam-xe-oto-re-phai-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.103b - Cấm xe ôtô rẽ phải" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103b-cam-xe-oto-re-phai-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103b-cam-xe-oto-re-phai-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103b-cam-xe-oto-re-phai.jpg 342w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.103b – Cấm xe ôtô rẽ phải</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-103b-cam-xe-oto-re-phai/" class="sign-link-overlay" title="Biển báo P.103b – Cấm xe ôtô rẽ phải"></a>',
        },
        {
            image: '<img width="298" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103a-cam-xe-oto-298x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.103a - Cấm xe ôtô" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103a-cam-xe-oto-298x300.jpg 298w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103a-cam-xe-oto-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p103a-cam-xe-oto.jpg 341w" sizes="auto, (max-width: 298px) 100vw, 298px" />',
            name_description_code: '<p class="sign-name">Biển báo P.103a – Cấm xe ôtô</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-103a-cam-xe-oto/" class="sign-link-overlay" title="Biển báo P.103a – Cấm xe ôtô"></a>',
        },
        {
            image: '<img width="300" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p102-cam-di-nguoc-chieu-300x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.102 - Cấm đi ngược chiều" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p102-cam-di-nguoc-chieu-300x300.jpg 300w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p102-cam-di-nguoc-chieu-150x150.jpg 150w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p102-cam-di-nguoc-chieu.jpg 333w" sizes="auto, (max-width: 300px) 100vw, 300px" />',
            name_description_code: '<p class="sign-name">Biển báo P.102 – Cấm đi ngược chiều</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-102-cam-di-nguoc-chieu/" class="sign-link-overlay" title="Biển báo P.102 – Cấm đi ngược chiều"></a>',
        },
        {
            image: '<img width="297" height="300" src="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p101-duong-cam-297x300.jpg" class="attachment-medium size-medium wp-post-image" alt="Biển báo P.101 - Đường cấm" decoding="async" loading="lazy" srcset="https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p101-duong-cam-297x300.jpg 297w, https://laihay.vn/wp-content/uploads/bien/ba/bien-bao-p101-duong-cam.jpg 331w" sizes="auto, (max-width: 297px) 100vw, 297px" />',
            name_description_code: '<p class="sign-name">Biển báo P.101 – Đường cấm</p>',
            link: '<a href="https://laihay.vn/bien-bao-giao-thong/bien-bao-p-101-duong-cam/" class="sign-link-overlay" title="Biển báo P.101 – Đường cấm"></a>',
        },
    ];

    console.log('rerender');

    return (
        <div>
            {listTrafficSign.map((item, index) => (
                <div key={index} className="sign-item">
                    {/* <div className="sign-image" dangerouslySetInnerHTML={{ __html: item.image }}></div>
                    <div className="sign-name-description" dangerouslySetInnerHTML={{ __html: item.name_description_code }}></div>
                    <div className="sign-link" dangerouslySetInnerHTML={{ __html: item.link }}></div> */}
                    {/* <div>{item.image.split(' ')?.[3]?.split('"')?.[1]}</div> */}
                    {/* <div>{item.name_description_code.split('>')?.[1]?.split('<')?.[0]}</div> */}
                    {/* <div>{item.name_description_code}</div> */}
                    {/* <div>{item.name_description_code.split('>')?.[1]?.split('<')?.[0]?.split(' – ')?.[0]?.split(' ')?.[2] || '==='}</div> */}
                    {/* <div>{item.name_description_code.split('>')?.[1]?.split('<')?.[0]?.split(' – ')?.[1] || '==='}</div> */}
                </div>
            ))}
        </div>
    )
}
