import React from 'react';
import styled, { css } from 'styled-components';
import defaultUser from 'assets/person.png';

export default function Avatar({ src, size }) {
    return (
        <AvatarFigure size={size}>
            <img src={src ?? defaultUser} alt="아바타이미지" />
        </AvatarFigure>
    );
}
const AvatarFigure = styled.figure`
    ${(props) => {
        switch (props.size) {
            case 'large':
                return css`
                    width: 100px;
                    height: 100px;
                `;

            default:
                return css`
                    width: 50px;
                    height: 50px;
                `;
        }
    }}

    border-radius: 50%; /*동그라미 */
    overflow: hidden; /*이미지가 삐져나오면 안보이게 */
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover; /*figure크기만큼 꽉 차게 */
        border-radius: 50%;
    }
`;
